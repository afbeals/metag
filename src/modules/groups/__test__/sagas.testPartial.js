// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Internal
import reducer from '../reducer';
import actions from '../actions';
import util from '../util';
import * as sagas from '../sagas';
import api from '~GlobalUtil/api';

const {
  groups: {
    getall: { request: getAll, success: getAllSuccess, fail: getAllFail },
    add: { request: add, success: addSuccess, fail: addFail },
    create: { request: create, success: createSuccess, fail: createFail },
    update: { request: update, success: updateSuccess, fail: updateFail },
    delete: { request: deleteReq, success: deleteSuccess, fail: deleteFail },
  },
} = actions;

/* eslint-disable max-len */
const groupsSagasTest = () =>
  describe('Sagas', () => {
    describe('Fetch All Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(sagas.watchReqForFetchAllGroups) // match to watcher
            .next() // start generator
            .takeLatest(getAll.type, sagas.groupsFetchAll) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () =>
          expectSaga(sagas.groupsFetchAll) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.group.get_all),
                {
                  data: [
                    {
                      id: 1,
                      name: 'adfa',
                      modified_at: 1,
                      amount: 0,
                    },
                  ],
                },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: {
                  1: { id: 1, name: 'adfa', date: 1, amount: 0 },
                },
              })
            )
            .put(
              getAllSuccess({
                1: { id: 1, name: 'adfa', date: 1, amount: 0 },
              })
            ) // eventual action that will be called
            .dispatch(getAll()) // dispatch action that starts saga
            .run());

        it('Should fail ', () =>
          expectSaga(sagas.groupsFetchAll)
            .provide([
              [
                matchers.call.fn(api.group.get_all),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(getAllFail('Error occured'))
            .dispatch(getAll())
            .run());
      });
    });

    describe('Add Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(sagas.watchReqForAddGroups) // match to watcher
            .next() // start generator
            .takeLatest(add.type, sagas.groupsAdd) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = {
            name: '12',
          };
          return expectSaga(sagas.groupsAdd, {
            payload: request,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.group.add, request),
                { data: [{ id: 1, name: '12', created_at: '', amount: 0 }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(util.buildInitialStore())
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, name: '12', date: '', amount: 0 } },
              })
            )
            .put(addSuccess({ 1: { id: 1, name: '12', date: '', amount: 0 } })) // eventual action that will be called
            .dispatch(add(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(sagas.groupsAdd, {
            payload: { name: '12' },
          })
            .provide([
              [
                matchers.call.fn(api.group.add),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(addFail('Error occured'))
            .dispatch(add())
            .run());
      });
    });

    describe('Create Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(sagas.watchReqForCreateGroups) // match to watcher
            .next() // start generator
            .takeLatest(create.type, sagas.groupsCreate) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = {
            category: '12',
          };
          return expectSaga(sagas.groupsCreate, {
            payload: request,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.group.create, request),
                { data: [{ id: 1, name: '12', created_at: '', amount: 0 }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(util.buildInitialStore())
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, name: '12', date: '', amount: 0 } },
              })
            )
            .put(
              createSuccess({ 1: { id: 1, name: '12', date: '', amount: 0 } })
            ) // eventual action that will be called
            .dispatch(create(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(sagas.groupsCreate, {
            payload: { name: '12' },
          })
            .provide([
              [
                matchers.call.fn(api.group.create),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(createFail('Error occured'))
            .dispatch(create())
            .run());
      });
    });

    describe('Update Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(sagas.watchReqForUpdateGroups) // match to watcher
            .next() // start generator
            .takeLatest(update.type, sagas.groupsUpdate) // match to generator
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
          return expectSaga(sagas.groupsUpdate, {
            payload: request,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.group.update, request),
                {
                  data: [{ ...request, created_at: '', amount: 0 }],
                },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(
              util.buildMockStore({
                list: { 1: { id: 1, name: 'data1', date: '', amount: 0 } },
              })
            )
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { ...request, date: '', amount: 0 } },
              })
            )
            .put(updateSuccess({ 1: { ...request, date: '', amount: 0 } })) // eventual action that will be called
            .dispatch(update(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(sagas.groupsUpdate, { payload: 'some data' })
            .provide([
              [
                matchers.call.fn(api.group.update),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(updateFail('Error occured')) // eventual action that will be called
            .dispatch(update({ id: 1, name: 'tag' })) // dispatch action that starts saga
            .run());
      });
    });

    describe('Delete Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(sagas.watchReqForDeleteGroups) // match to watcher
            .next() // start generator
            .takeLatest(deleteReq.type, sagas.groupsDelete) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Delete Series: ', () => {
        it('Should be successful ', () => {
          const request = { id: 1 };
          return expectSaga(sagas.groupsDelete, {
            payload: request,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.group.delete, request), { status: 200 }], // supply mock return data from api
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
          expectSaga(sagas.groupsDelete, { payload: { id: 2 } })
            .provide([
              [
                matchers.call.fn(api.group.delete),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
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
            .put(deleteFail('Error occured')) // eventual action that will be called
            .dispatch(deleteReq({ id: 2 })) // dispatch action that starts saga
            .run());
      });
    });
  });

export default groupsSagasTest;
