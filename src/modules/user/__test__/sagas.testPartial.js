// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Internal
import reducer from '../reducer';
import actions from '../actions';
import util from '../util';
import * as userSagas from '../sagas';
import api from '~GlobalUtil/api';

const {
  user: {
    login: {
      request: userLoginRequest,
      success: userLoginSuccess,
      fail: userLoginFail,
    },
    reset: userReset,
  },
} = actions;

/* eslint-disable max-len */
const userSagasTest = () =>
  describe('Sagas', () => {
    describe('Login Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request for login', () => {
          testSaga(userSagas.watchRequestForLogin) // match to watcher
            .next() // start generator
            .takeLatest(userLoginRequest.type, userSagas.login) // match to generator
            .next() // step through generator
            .isDone();
        });
      });

      describe('Login Series: ', () => {
        it('Should be successful login', () => {
          const request = {
            username: 'username',
          };
          return expectSaga(userSagas.login, { payload: request }) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(api.userLogin, request),
                {
                  data: {
                    id: 2,
                    username: 'user',
                    first_name: 'first',
                    last_name: 'last',
                  },
                },
              ], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                info: {
                  id: 2,
                  username: 'user',
                  firstName: 'first',
                  lastName: 'last',
                },
              })
            )
            .put(
              userLoginSuccess({
                id: 2,
                username: 'user',
                firstName: 'first',
                lastName: 'last',
              })
            ) // eventual action that will be called
            .put(
              userReset({
                id: 2,
                username: 'user',
                firstName: 'first',
                lastName: 'last',
              })
            )
            .dispatch(userLoginRequest(request)) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () =>
          expectSaga(userSagas.login, { payload: 'some data' })
            .provide([
              [
                matchers.call.fn(api.userLogin),
                throwError('Error retrieving devices'),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(
              util.buildMockStore({
                info: null,
              })
            )
            .put(userLoginFail()) // eventual action that will be called
            .dispatch(userLoginRequest({ username: 'user' })) // dispatch action that starts saga
            .run());
      });
    });
  });

export default userSagasTest;
