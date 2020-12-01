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
    reset: resetTags,
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
                matchers.call.fn(api.tagsFetch),
                { data: [{ id: 1, tag: 'adfa' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, tag: 'adfa' } },
              })
            )
            .put(getTagsSuccess([{ id: 1, tag: 'adfa' }])) // eventual action that will be called
            .put(resetTags([{ id: 1, tag: 'adfa' }])) // eventual action that will be called
            .dispatch(getTags([{ id: 1, tag: 'adfa' }])) // dispatch action that starts saga
            .run());

        it('Should fail ', () =>
          expectSaga(tagsSagas.tagsFetch)
            .provide([
              [
                matchers.call.fn(api.tagsFetch),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(getTagsFail())
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
                matchers.call.fn(api.tagsCreate, request),
                { data: [{ id: 1, tag: '12' }] },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(util.buildInitialStore())
            .hasFinalState(
              util.buildMockStore({
                list: { 1: { id: 1, tag: '12' } },
              })
            )
            .put(createTagsSuccess([{ id: 1, tag: '12' }])) // eventual action that will be called
            .dispatch(createTags(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(tagsSagas.tagsCreate, { payload: { tag: '12' } })
            .provide([
              [
                matchers.call.fn(api.tagsCreate),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(createTagsFail())
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
                matchers.call.fn(api.tagsUpdate, request),
                {
                  data: request,
                },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .withState(
              util.buildMockStore({ list: { 1: { id: 1, tag: 'data' } } })
            )
            .hasFinalState(
              util.buildMockStore({
                list: { 1: request },
              })
            )
            .put(updateTagsSuccess(request)) // eventual action that will be called
            .dispatch(updateTags(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(tagsSagas.tagsUpdate, { payload: 'some data' })
            .provide([
              [
                matchers.call.fn(api.tagsUpdate),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(util.buildInitialStore())
            .put(updateTagsFail()) // eventual action that will be called
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
              [matchers.call.fn(api.tagsDelete, request), { status: 200 }], // supply mock return data from api
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
                matchers.call.fn(api.tagsDelete),
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
            .put(deleteTagsFail()) // eventual action that will be called
            .dispatch(deleteTags({ id: 2 })) // dispatch action that starts saga
            .run());
      });
    });
  });

export default tagsSagasTest;
