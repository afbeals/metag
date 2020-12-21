// External
import {
  takeLatest,
  all,
  fork,
  race,
  take,
  cancel,
  put,
} from 'redux-saga/effects';

// Internal
import actions from './actions';
import api from '~GlobalUtil/api';
import { sagaRequest } from '~GlobalUtil/normalize';
import appActions from '~Modules/app/actions';

// Constants
const {
  app: {
    notify: { show },
  },
} = appActions;
const {
  user: {
    login: {
      request: userLoginRequest,
      success: userLoginSuccess,
      fail: userLoginFail,
      cancel: userLoginCancel,
    },
  },
} = actions;

// success generators
function* loginSuccessActions() {
  yield all([take(userLoginSuccess.type)]);
  return true;
}

// Series Generators
export function* login({ payload }) {
  try {
    if (!payload) throw new Error('missing payload');
    const normalizeUserInfo = data => {
      const { first_name: firstName, last_name: lastName, username, id } = data;
      return { firstName, lastName, username, id };
    };
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.user.login, payload],
        successActs: [userLoginSuccess],
        successDataTrns: normalizeUserInfo,
        failActs: userLoginFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(userLoginCancel.type),
      success: loginSuccessActions(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error Logging in', type: 'error' }));
  }
}

// WATCHERS
export function* watchRequestForLogin() {
  yield takeLatest(userLoginRequest.type, login);
}

function* watcher() {
  yield all([watchRequestForLogin()]);
}

export default watcher;
