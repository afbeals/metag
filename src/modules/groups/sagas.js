// External
import { takeLatest, all, fork, race, take, cancel } from 'redux-saga/effects';

// Internal
import actions from './actions';
import api from '~GlobalUtil/api';
import normalize from '~GlobalUtil/normalize';
import groupsUtil from './util';

// Constants
const { sagaRequest } = normalize;
const { normalizeGroupsArray } = groupsUtil;
const {
  groups: {
    getall: {
      request: getAll,
      success: getAllSuccess,
      fail: getAllFail,
      cancel: getAllCancel,
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
    console.log(e);
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
    console.log(e);
  }
}

export function* groupsUpdate({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.group.update, payload],
        successActs: updateSuccess,
        successDataTrns: null,
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
    console.log(e);
  }
}

export function* groupsCreate({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.group.create, payload],
        successActs: createSuccess,
        successDataTrns: null,
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
    console.log(e);
  }
}

// WATCHERS
export function* watchReqForCreateGroups() {
  yield takeLatest(create.type, groupsCreate);
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
    watchReqForDeleteGroups(),
    watchReqForUpdateGroups(),
  ]);
}

export default watcher;
