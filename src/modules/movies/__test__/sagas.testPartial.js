// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Internal
import reducer from '../reducer';
import moviesActions from '../actions';
import util from '../util';
import * as moviesSagas from '../sagas';
import api from '~GlobalUtil/api';

const {
  movies: {
    all: { request: allReq, success: allSuccess, fail: allFail },
    under_cat: {
      request: under_catReq,
      success: under_catSuccess,
      fail: under_catFail,
    },
    under_tag: {
      request: under_tagReq,
      success: under_tagSuccess,
      fail: under_tagFail,
    },
    search: { request: searchReq, success: searchSuccess, fail: searchFail },
    add: { request: addReq, success: addSuccess, fail: addFail },
    delete: { request: deleteReq, success: deleteSuccess, fail: deleteFail },
    update: { request: updateReq, success: updateSuccess, fail: updateFail },
  },
} = moviesActions;

/* eslint-disable max-len */
const moviesSagasTest = () =>
  describe('Sagas: ', () => {
    describe('Fetch All Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(moviesSagas.watchReqForFetchAll) // match to watcher
            .next() // start generator
            .takeLatest(allReq.type, moviesSagas.fetchAll) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () =>
          expectSaga(moviesSagas.fetchAll) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.movie.all),
                { data: [{ movie_id: 1, name: 'adfa' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, name: 'adfa', tag_ids: [] } },
              })
            )
            .put(allSuccess({ 1: { id: 1, name: 'adfa', tag_ids: [] } })) // eventual action that will be called
            .dispatch(allReq()) // dispatch action that starts saga
            .run());

        it('Should fail ', () =>
          expectSaga(moviesSagas.fetchAll)
            .provide([
              [
                matchers.call.fn(api.movie.all),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(allFail())
            .dispatch(allReq())
            .run());
      });
    });

    describe('Fetch Under Cat Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(moviesSagas.watchReqForFetchUnderCat) // match to watcher
            .next() // start generator
            .takeLatest(under_catReq.type, moviesSagas.fetchUnderCat) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = { category: 1 };
          expectSaga(moviesSagas.fetchUnderCat, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.movie.underCat, request),
                { data: [{ movie_id: 1, name: 'adfa' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, name: 'adfa', tag_ids: [] } },
              })
            )
            .put(under_catSuccess({ 1: { id: 1, name: 'adfa', tag_ids: [] } })) // eventual action that will be called
            .dispatch(under_catReq(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(moviesSagas.fetchUnderCat, { payload: { tag: '12' } })
            .provide([
              [
                matchers.call.fn(api.movie.underCat),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(under_catFail())
            .dispatch(under_catReq())
            .run());
      });
    });

    describe('Fetch Under Tags: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(moviesSagas.watchReqForFetchUnderTag) // match to watcher
            .next() // start generator
            .takeLatest(under_tagReq.type, moviesSagas.fetchUnderTag) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = { tags: 1 };
          expectSaga(moviesSagas.fetchUnderTag, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.movie.underTag, request),
                { data: [{ id: 1, name: 'adfa' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, name: 'adfa' } },
              })
            )
            .put(under_tagSuccess([{ id: 1, name: 'adfa' }])) // eventual action that will be called
            .dispatch(under_tagReq(request)) // dispatch action that starts saga
            .run();
        });

        it.skip('Should fail ', () =>
          expectSaga(moviesSagas.fetchUnderTag, { payload: {} })
            .provide([
              [
                matchers.call.fn(api.movie.underTag),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer, util.buildInitialStore())
            .withState(util.buildInitialStore())
            .hasFinalState({ list: null, selectedId: null, search: null })
            .put(under_tagFail())
            .dispatch(under_tagReq({ payload: {} }))
            .run());
      });
    });

    describe('Search for movie: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(moviesSagas.watchReqForSearchMovie) // match to watcher
            .next() // start generator
            .takeLatest(searchReq.type, moviesSagas.searchMovie) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = { name: '1' };
          expectSaga(moviesSagas.searchMovie, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.movie.search, request),
                { data: [{ movie_id: 1, name: '1' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: {
                  1: { id: 1, tag_ids: [], name: '1' },
                },
              })
            )
            .put(searchSuccess({ 1: { id: 1, tag_ids: [], name: '1' } })) // eventual action that will be called
            .dispatch(searchReq(request)) // dispatch action that starts saga
            .run();
        });

        it.skip('Should fail ', () =>
          expectSaga(moviesSagas.searchMovie, { payload: { tag: '12' } })
            .provide([
              [
                matchers.call.fn(api.movie.search),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(searchFail())
            .dispatch(searchReq())
            .run());
      });
    });

    describe('Add movie: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(moviesSagas.watchReqForAddMovie) // match to watcher
            .next() // start generator
            .takeLatest(addReq.type, moviesSagas.addMovie) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = { name: '1' };
          expectSaga(moviesSagas.addMovie, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.movie.add, request),
                { data: [{ id: 1, name: '1' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: {
                  1: { id: 1, name: '1' },
                },
              })
            )
            .put(addSuccess([{ id: 1, name: '1' }])) // eventual action that will be called
            .dispatch(addReq(request)) // dispatch action that starts saga
            .run();
        });

        it.skip('Should fail ', () =>
          expectSaga(moviesSagas.addMovie, { payload: { tag: '12' } })
            .provide([
              [
                matchers.call.fn(api.movie.add),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(addFail())
            .dispatch(addReq())
            .run());
      });
    });

    describe('Delete movie: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(moviesSagas.watchReqForDeleteMovie) // match to watcher
            .next() // start generator
            .takeLatest(deleteReq.type, moviesSagas.deleteMovie) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = { id: '1' };
          expectSaga(moviesSagas.deleteMovie, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.movie.delete, request)], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(
              util.buildMockStore({
                list: {
                  1: { id: 1, name: '4' },
                },
              })
            )
            .hasFinalState(util.buildMockStore({}))
            .put(deleteSuccess(1)) // eventual action that will be called
            .dispatch(deleteReq(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () => {
          expectSaga(moviesSagas.deleteMovie, { payload: { id: 2 } })
            .provide([
              [
                matchers.call.fn(api.movie.delete, { id: 2 }),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .withState(
              util.buildMockStore({
                list: { 1: { id: 1 }, 2: { id: 2 } },
              })
            )
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1 }, 2: { id: 2 } },
              })
            )
            .put(deleteFail()) // eventual action that will be called
            .dispatch(deleteReq({ id: 2 })) // dispatch action that starts saga
            .run();
        });
      });
    });

    describe('Update movie: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(moviesSagas.watchReqForUpdateMovie) // match to watcher
            .next() // start generator
            .takeLatest(updateReq.type, moviesSagas.updateMovie) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = { id: 1 };
          expectSaga(moviesSagas.updateMovie, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.movie.update, request),
                [{ id: '1', name: 'name' }],
              ], // supply mock return data from api
            ])
            .withReducer(
              reducer,
              util.buildMockStore({
                list: {
                  1: { id: 1, name: '1' },
                },
              })
            )
            .hasFinalState(
              util.buildMockStore({
                list: {
                  1: { id: 1, name: 'name' },
                },
              })
            )
            .put(updateSuccess({ success: true })) // eventual action that will be called
            .dispatch(updateReq({ id: '1', name: 'name' })) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () => {
          expectSaga(moviesSagas.updateMovie, { payload: { id: 2 } })
            .provide([
              [
                matchers.call.fn(api.movie.update),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(
              reducer,
              util.buildMockStore({
                list: { 1: { id: 1 }, 2: { id: 2 } },
              })
            )
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1 }, 2: { id: 2 } },
              })
            )
            .put(updateFail()) // eventual action that will be called
            .dispatch(updateReq({ id: 2 })) // dispatch action that starts saga
            .run();
        });
      });
    });
  });

export default moviesSagasTest;
