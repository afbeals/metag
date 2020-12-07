// External
import { takeLatest, all, fork, race, take, cancel } from 'redux-saga/effects';

// Internal
import categoriesActions from './actions';
import api from '~GlobalUtil/api';
import normalize from '~GlobalUtil/normalize';

// Constants
const { sagaRequest } = normalize;
const {
  categories: {
    getall: {
      request: getAll,
      success: getAllSuccess,
      fail: getAllFail,
      cancel: getAllCancel,
    },
    getavailable: {
      request: getAvailable,
      success: getAvailableSuccess,
      fail: getAvailableFail,
      cancel: getAvailableCancel,
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
} = categoriesActions;

// success generators
function* getAllSuccesses() {
  yield all([take(getAllSuccess.type)]);
  return true;
}

function* getAvailableSuccesses() {
  yield all([take(getAvailableSuccess.type)]);
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
export function* categoriesFetchAll() {
  try {
    const normalizeCat = catArray =>
      catArray.map(({ id, name, created_at, modified_at = null }) => ({
        id,
        name,
        date: modified_at || created_at,
      }));

    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.cat.fetchAll],
        successActs: [getAllSuccess],
        successDataTrns: normalizeCat,
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

export function* categoriesFetchAvailable() {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.cat.fetchAvail],
        successActs: [getAvailableSuccess],
        successDataTrns: null,
        failActs: getAvailableFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(getAvailableCancel.type),
      success: getAvailableSuccesses(),
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

export function* categoriesDelete({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.cat.delete, payload],
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

export function* categoriesUpdate({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.cat.update, payload],
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

export function* categoriesCreate({ payload }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.cat.create, payload],
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
export function* watchReqForCreateCategories() {
  yield takeLatest(create.type, categoriesCreate);
}

export function* watchReqForFetchAllCategories() {
  yield takeLatest(getAll.type, categoriesFetchAll);
}

export function* watchReqForFetchAvailCategories() {
  yield takeLatest(getAvailable.type, categoriesFetchAvailable);
}

export function* watchReqForDeleteCategories() {
  yield takeLatest(deleteReq.type, categoriesDelete);
}

export function* watchReqForUpdateCategories() {
  yield takeLatest(update.type, categoriesUpdate);
}

function* watcher() {
  yield all([
    watchReqForCreateCategories(),
    watchReqForFetchAllCategories(),
    watchReqForFetchAvailCategories(),
    watchReqForDeleteCategories(),
    watchReqForUpdateCategories(),
  ]);
}

export default watcher;
