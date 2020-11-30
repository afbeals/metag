// External
import { takeLatest, all, fork, race, take, cancel } from 'redux-saga/effects';

// Internal
import actions from './actions';
import api from '~GlobalUtil/api';
import { sagaRequest } from '~GlobalUtil/normalize';

// Constants

const {
  user: {
    login: {
      request: userLoginRequest,
      success: userLoginSuccess,
      fail: userLoginFail,
      cancel: userLoginCancel,
    },
    reset: userReset,
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
        params: [api.userLogin, payload],
        successActs: [userReset, userLoginSuccess],
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
    console.log('saga error', e.message);
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
