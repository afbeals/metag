// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Internal
import reducer from '../reducer';
import categoriesActions from '../actions';
import util from '../util';
import * as categoriesSagas from '../sagas';
import api from '~GlobalUtil/api';

const {
  categories: {
    getall: { request: getAll, success: getAllSuccess, fail: getAllFail },
    getavailable: {
      request: getAvail,
      success: getAvailSuccess,
      fail: getAvailFail,
    },
    create: { request: create, success: createSuccess, fail: createFail },
    update: { request: update, success: updateSuccess, fail: updateFail },
    delete: { request: deleteReq, success: deleteSuccess, fail: deleteFail },
    reset: reset,
  },
} = categoriesActions;

/* eslint-disable max-len */
const categoriesSagasTest = () =>
  describe('Sagas', () => {
    describe('Fetch All Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(categoriesSagas.watchReqForFetchAllCategories) // match to watcher
            .next() // start generator
            .takeLatest(getAll.type, categoriesSagas.categoriesFetchAll) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () =>
          expectSaga(categoriesSagas.categoriesFetchAll) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.cat.fetchAll),
                { data: [{ id: 1, name: 'adfa' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, name: 'adfa' } },
              })
            )
            .put(getAllSuccess([{ id: 1, name: 'adfa' }])) // eventual action that will be called
            .put(reset([{ id: 1, name: 'adfa' }])) // eventual action that will be called
            .dispatch(getAll()) // dispatch action that starts saga
            .run());

        it('Should fail ', () =>
          expectSaga(categoriesSagas.categoriesFetchAll)
            .provide([
              [
                matchers.call.fn(api.cat.fetchAll),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(getAllFail())
            .dispatch(getAll())
            .run());
      });
    });

    describe('Fetch Available Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(categoriesSagas.watchReqForFetchAvailCategories) // match to watcher
            .next() // start generator
            .takeLatest(getAvail.type, categoriesSagas.categoriesFetchAvailable) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () =>
          expectSaga(categoriesSagas.categoriesFetchAvailable) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.cat.fetchAvail), { data: ['adfa'] }], // supply mock return data from api
            ])
            .put(getAvailSuccess(['adfa'])) // eventual action that will be called
            .dispatch(getAvail()) // dispatch action that starts saga
            .run());

        it('Should fail ', () =>
          expectSaga(categoriesSagas.categoriesFetchAvailable)
            .provide([
              [
                matchers.call.fn(api.cat.fetchAvail),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .put(getAvailFail())
            .dispatch(getAvail())
            .run());
      });
    });

    describe('Create Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(categoriesSagas.watchReqForCreateCategories) // match to watcher
            .next() // start generator
            .takeLatest(create.type, categoriesSagas.categoriesCreate) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = {
            category: '12',
          };
          return expectSaga(categoriesSagas.categoriesCreate, {
            payload: request,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.cat.create, request),
                { data: [{ id: 1, name: '12' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(util.buildInitialStore())
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, name: '12' } },
              })
            )
            .put(createSuccess([{ id: 1, name: '12' }])) // eventual action that will be called
            .dispatch(create(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(categoriesSagas.categoriesCreate, {
            payload: { name: '12' },
          })
            .provide([
              [
                matchers.call.fn(api.cat.create),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(createFail())
            .dispatch(create())
            .run());
      });
    });

    describe('Update Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(categoriesSagas.watchReqForUpdateCategories) // match to watcher
            .next() // start generator
            .takeLatest(update.type, categoriesSagas.categoriesUpdate) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Update Series: ', () => {
        it('Should be successful ', () => {
          const request = {
            name: 'data2',
            id: 1,
          };
          return expectSaga(categoriesSagas.categoriesUpdate, {
            payload: request,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.cat.update, request),
                {
                  data: [request],
                },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(
              util.buildMockStore({ list: { 1: { id: 1, name: 'data1' } } })
            )
            .hasFinalState(
              util.buildMockStore({
                list: { 1: request },
              })
            )
            .put(updateSuccess([request])) // eventual action that will be called
            .dispatch(update(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(categoriesSagas.categoriesUpdate, { payload: 'some data' })
            .provide([
              [
                matchers.call.fn(api.cat.update),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(updateFail()) // eventual action that will be called
            .dispatch(update({ id: 1, name: 'tag' })) // dispatch action that starts saga
            .run());
      });
    });

    describe('Delete Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(categoriesSagas.watchReqForDeleteCategories) // match to watcher
            .next() // start generator
            .takeLatest(deleteReq.type, categoriesSagas.categoriesDelete) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Delete Series: ', () => {
        it('Should be successful ', () => {
          const request = { id: 1 };
          return expectSaga(categoriesSagas.categoriesDelete, {
            payload: request,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.cat.delete, request), { status: 200 }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(
              util.buildMockStore({
                list: { 1: { id: 1 }, 2: { id: 2 } },
              })
            )
            .hasFinalState(
              util.buildMockStore({
                list: { 2: { id: 2 } },
              })
            )
            .put(deleteSuccess(1)) // eventual action that will be called
            .dispatch(deleteReq(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(categoriesSagas.categoriesDelete, { payload: { id: 2 } })
            .provide([
              [
                matchers.call.fn(api.cat.delete),
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
            .run());
      });
    });
  });

export default categoriesSagasTest;
