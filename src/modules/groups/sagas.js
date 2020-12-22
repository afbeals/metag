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
import normalize from '~GlobalUtil/normalize';
import groupsUtil from './util';
import appActions from '~Modules/app/actions';

// Constants
const { sagaRequest } = normalize;
const { normalizeGroupsArray } = groupsUtil;
const {
  app: {
    notify: { show },
  },
} = appActions;
const {
  groups: {
    getall: {
      request: getAll,
      success: getAllSuccess,
      fail: getAllFail,
      cancel: getAllCancel,
    },
    add: {
      request: add,
      success: addSuccess,
      fail: addFail,
      cancel: addCancel,
    },
    create: {
      request: create,
      success: createSuccess,
      fail: createFail,
      cancel: createCancel,
    },
    update: {
      request: update,
      success: updateSuccess,
      fail: updateFail,
      cancel: updateCancel,
    },
    delete: {
      request: deleteReq,
      success: deleteReqSuccess,
      fail: deleteReqFail,
      cancel: deleteReqCancel,
    },
  },
} = actions;

// success generators
function* getAllSuccesses() {
  yield all([take(getAllSuccess.type)]);
  return true;
}

function* deleteReqSuccesses() {
  yield all([take(deleteReqSuccess.type)]);
  return true;
}

function* addSuccesses() {
  yield all([take(addSuccess.type)]);
  return true;
}

function* createSuccesses() {
  yield all([take(createSuccess.type)]);
  return true;
}

function* updateSuccesses() {
  yield all([take(updateSuccess.type)]);
  return true;
}

// Series Generators
export function* groupsFetchAll() {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.group.get_all],
        successActs: [getAllSuccess],
        successDataTrns: normalizeGroupsArray,
        failActs: getAllFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(getAllCancel.type),
      success: getAllSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error Fetching All Groups', type: 'error' }));
  }
}

export function* groupsDelete({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.group.delete, payload],
        successActs: deleteReqSuccess,
        successDataTrns: () => payload.id,
        failActs: deleteReqFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(deleteReqCancel.type),
      success: deleteReqSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error Deleting Group', type: 'error' }));
  }
}

export function* groupsUpdate({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.group.update, payload],
        successActs: updateSuccess,
        successDataTrns: normalizeGroupsArray,
        failActs: updateFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(updateCancel.type),
      success: updateSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error updating group', type: 'error' }));
  }
}

export function* groupsAdd({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.group.add, payload],
        successActs: addSuccess,
        successDataTrns: normalizeGroupsArray,
        failActs: addFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(addCancel.type),
      success: addSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error adding group', type: 'error' }));
  }
}

export function* groupsCreate({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.group.create, payload],
        successActs: createSuccess,
        successDataTrns: normalizeGroupsArray,
        failActs: createFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(createCancel.type),
      success: createSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error creating group', type: 'error' }));
  }
}

// WATCHERS
export function* watchReqForCreateGroups() {
  yield takeLatest(create.type, groupsCreate);
}

export function* watchReqForAddGroups() {
  yield takeLatest(add.type, groupsAdd);
}

export function* watchReqForFetchAllGroups() {
  yield takeLatest(getAll.type, groupsFetchAll);
}

export function* watchReqForDeleteGroups() {
  yield takeLatest(deleteReq.type, groupsDelete);
}

export function* watchReqForUpdateGroups() {
  yield takeLatest(update.type, groupsUpdate);
}

function* watcher() {
  yield all([
    watchReqForCreateGroups(),
    watchReqForFetchAllGroups(),
    watchReqForAddGroups(),
    watchReqForDeleteGroups(),
    watchReqForUpdateGroups(),
  ]);
}

export default watcher;
