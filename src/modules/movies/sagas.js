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
import movieUtil from './util';
import appActions from '~Modules/app/actions';

// Constants
const { sagaRequest } = normalize;
const { normalizeMoviesArray } = movieUtil;
const {
  app: {
    notify: { show },
  },
} = appActions;
const {
  movies: {
    all: {
      request: allReq,
      success: allSuccess,
      fail: allFail,
      cancel: allCancel,
    },
    under_group: {
      request: underGroup,
      success: underGroupSuccess,
      fail: underGroupFail,
      cancel: underGroupCancel,
    },
    under_cat: {
      request: under_catReq,
      success: under_catSuccess,
      fail: under_catFail,
      cancel: under_catCancel,
    },
    under_tag: {
      request: under_tagReq,
      success: under_tagSuccess,
      fail: under_tagFail,
      cancel: under_tagCancel,
    },
    search: {
      request: searchReq,
      success: searchSuccess,
      fail: searchFail,
      cancel: searchCancel,
    },
    add: {
      request: addReq,
      success: addSuccess,
      fail: addFail,
      cancel: addCancel,
    },
    delete: {
      request: deleteReq,
      success: deleteSuccess,
      fail: deleteFail,
      cancel: deleteCancel,
    },
    update: {
      request: updateReq,
      success: updateSuccess,
      fail: updateFail,
      cancel: updateCancel,
    },
  },
} = actions;

// success generators
function* fetchAllSuccesses() {
  yield all([take(allSuccess.type)]);
  return true;
}

function* fetchUnderGroupSuccesses() {
  yield all([take(underGroupSuccess.type)]);
  return true;
}

function* fetchUnderCatSuccesses() {
  yield all([take(under_catSuccess.type)]);
  return true;
}

function* fetchUnderTagSuccesses() {
  yield all([take(under_tagSuccess.type)]);
  return true;
}

function* searchSuccesses() {
  yield all([take(searchSuccess.type)]);
  return true;
}

function* addSuccesses() {
  yield all([take(addSuccess.type)]);
  return true;
}

function* deleteSuccesses() {
  yield all([take(deleteSuccess.type)]);
  return true;
}

function* updateSuccesses() {
  yield all([take(updateSuccess.type)]);
  return true;
}

// Series Generators
export function* fetchAll() {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.all],
        successActs: allSuccess,
        successDataTrns: normalizeMoviesArray,
        failActs: allFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(allCancel.type),
      success: fetchAllSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error Fetching All Movies', type: 'error' }));
  }
}

export function* fetchUnderGroup({ payload: request }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.underGroup, request],
        successActs: underGroupSuccess,
        successDataTrns: normalizeMoviesArray,
        failActs: underGroupFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(underGroupCancel.type),
      success: fetchUnderGroupSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error Fetching Group Movies', type: 'error' }));
  }
}

export function* fetchUnderCat({ payload: request }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.underCat, request],
        successActs: under_catSuccess,
        successDataTrns: normalizeMoviesArray,
        failActs: under_catFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(under_catCancel.type),
      success: fetchUnderCatSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(
      show({ message: 'Error Fetching Category Movies', type: 'error' })
    );
  }
}

export function* fetchUnderTag({ payload: request }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.underTag, request],
        successActs: under_tagSuccess,
        successDataTrns: normalizeMoviesArray,
        failActs: under_tagFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(under_tagCancel.type),
      success: fetchUnderTagSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error Fetching Tag Movies', type: 'error' }));
  }
}

export function* searchMovie({ payload: request }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.search, request],
        successActs: searchSuccess,
        successDataTrns: normalizeMoviesArray,
        failActs: searchFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(searchCancel.type),
      success: searchSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error Searching for Movies', type: 'error' }));
  }
}

export function* addMovie({ payload: request }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.add, request],
        successActs: addSuccess,
        successDataTrns: normalizeMoviesArray,
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
    yield put(show({ message: 'Error Adding Movies', type: 'error' }));
  }
}

export function* deleteMovie({ payload: request }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.delete, request],
        successActs: deleteSuccess,
        successDataTrns: () => request.id,
        failActs: deleteFail,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(deleteCancel.type),
      success: deleteSuccesses(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(show({ message: 'Error deleting Movies', type: 'error' }));
  }
}

export function* updateMovie({ payload: request }) {
  try {
    const apiCalls = yield all([
      fork(sagaRequest, {
        params: [api.movie.update, request],
        successActs: updateSuccess,
        successDataTrns: normalizeMoviesArray,
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
    yield put(show({ message: 'Error updating Movies', type: 'error' }));
  }
}

// WATCHERS
export function* watchReqForFetchAll() {
  yield takeLatest(allReq.type, fetchAll);
}

export function* watchReqForFetchUnderGroup() {
  yield takeLatest(underGroup.type, fetchUnderGroup);
}

export function* watchReqForFetchUnderCat() {
  yield takeLatest(under_catReq.type, fetchUnderCat);
}

export function* watchReqForFetchUnderTag() {
  yield takeLatest(under_tagReq.type, fetchUnderTag);
}

export function* watchReqForSearchMovie() {
  yield takeLatest(searchReq.type, searchMovie);
}

export function* watchReqForAddMovie() {
  yield takeLatest(addReq.type, addMovie);
}

export function* watchReqForDeleteMovie() {
  yield takeLatest(deleteReq.type, deleteMovie);
}

export function* watchReqForUpdateMovie() {
  yield takeLatest(updateReq.type, updateMovie);
}

function* watcher() {
  yield all([
    watchReqForFetchAll(),
    watchReqForFetchUnderGroup(),
    watchReqForFetchUnderCat(),
    watchReqForFetchUnderTag(),
    watchReqForSearchMovie(),
    watchReqForAddMovie(),
    watchReqForDeleteMovie(),
    watchReqForUpdateMovie(),
  ]);
}

export default watcher;
