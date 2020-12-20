// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Internal
import reducer from '../reducer';
import tagsActions from '../actions';
import util from '../util';
import * as tagsSagas from '../sagas';
import api from '~GlobalUtil/api';

const {
  tags: {
    get: { request: getTags, success: getTagsSuccess, fail: getTagsFail },
    create: {
      request: createTags,
      success: createTagsSuccess,
      fail: createTagsFail,
    },
    update: {
      request: updateTags,
      success: updateTagsSuccess,
      fail: updateTagsFail,
    },
    delete: {
      request: deleteTags,
      success: deleteTagsSuccess,
      fail: deleteTagsFail,
    },
  },
} = tagsActions;

/* eslint-disable max-len */
const tagsSagasTest = () =>
  describe('Sagas', () => {
    describe('Fetch Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(tagsSagas.watchRequestForFetchTags) // match to watcher
            .next() // start generator
            .takeLatest(getTags.type, tagsSagas.tagsFetch) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () =>
          expectSaga(tagsSagas.tagsFetch) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.tags.fetch),
                { data: [{ id: 1, tag: 'adfa', created_at: '' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, tag: 'adfa', date: '' } },
              })
            )
            .put(getTagsSuccess({ 1: { id: 1, tag: 'adfa', date: '' } })) // eventual action that will be called
            .dispatch(getTags()) // dispatch action that starts saga
            .run());

        it('Should fail ', () =>
          expectSaga(tagsSagas.tagsFetch)
            .provide([
              [
                matchers.call.fn(api.tags.fetch),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(getTagsFail('Error occured'))
            .dispatch(getTags())
            .run());
      });
    });

    describe('Create Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(tagsSagas.watchRequestForCreateTag) // match to watcher
            .next() // start generator
            .takeLatest(createTags.type, tagsSagas.tagsCreate) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = {
            tag: '12',
          };
          return expectSaga(tagsSagas.tagsCreate, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.tags.create, request),
                { data: [{ id: 1, tag: '12', created_at: '' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(util.buildInitialStore())
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, tag: '12', date: '' } },
              })
            )
            .put(createTagsSuccess({ 1: { id: 1, tag: '12', date: '' } })) // eventual action that will be called
            .dispatch(createTags(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(tagsSagas.tagsCreate, { payload: { tag: '12' } })
            .provide([
              [
                matchers.call.fn(api.tags.create),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(createTagsFail('Error occured'))
            .dispatch(createTags())
            .run());
      });
    });

    describe('Update Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(tagsSagas.watchRequestForUpdateTags) // match to watcher
            .next() // start generator
            .takeLatest(updateTags.type, tagsSagas.tagsUpdate) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Update Series: ', () => {
        it('Should be successful ', () => {
          const request = {
            tag: 'data',
            id: 1,
          };
          return expectSaga(tagsSagas.tagsUpdate, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.tags.update, request),
                {
                  data: [{ id: 1, tag: 'data', created_at: '' }],
                },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(
              util.buildMockStore({
                list: { 1: { id: 1, tag: 'data', date: '' } },
              })
            )
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { ...request, date: '' } },
              })
            )
            .put(updateTagsSuccess({ 1: { ...request, date: '' } })) // eventual action that will be called
            .dispatch(updateTags(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(tagsSagas.tagsUpdate, { payload: 'some data' })
            .provide([
              [
                matchers.call.fn(api.tags.update),
                throwError({
                  response: { data: { message: 'Error occured' } },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(updateTagsFail('Error occured')) // eventual action that will be called
            .dispatch(updateTags({ id: 1, tag: 'tag' })) // dispatch action that starts saga
            .run());
      });
    });

    describe('Delete Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => {
          testSaga(tagsSagas.watchRequestForDeleteTag) // match to watcher
            .next() // start generator
            .takeLatest(deleteTags.type, tagsSagas.tagsDelete) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Delete Series: ', () => {
        it('Should be successful ', () => {
          const request = { id: 1 };
          return expectSaga(tagsSagas.tagsDelete, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.tags.delete, request), { status: 200 }], // supply mock return data from api
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
            .put(deleteTagsSuccess(1)) // eventual action that will be called
            .dispatch(deleteTags(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(tagsSagas.tagsDelete, { payload: { id: 2 } })
            .provide([
              [
                matchers.call.fn(api.tags.delete),
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
            .put(deleteTagsFail('Error occured')) // eventual action that will be called
            .dispatch(deleteTags({ id: 2 })) // dispatch action that starts saga
            .run());
      });
    });
  });

export default tagsSagasTest;
