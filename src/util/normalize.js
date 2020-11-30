// External
import { createAction } from '@reduxjs/toolkit';

/**
 * @name getRequestMatch
 * @desc test string if ends with request reserved word
 * @param {string} string string to test against
 * @example
 * const matches = getRequestMatch('USER/REQUEST');
 * console.log(matches);
 */
export const getRequestMatch = string =>
  /(.*)(REQUEST|SUCCESS|FAIL|CANCEL)/.exec(string);

/**
 * @name getCapitalized
 * @desc capitalize the string
 * @param {String} string the string to be capitalised
 * @example
 * const newString = getCapitalized('test'); // Test
 */
export const getCapitalized = string =>
  string
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');

/**
 * @name createActions
 * @desc create actions from map
 * @param {object} entries the map of actions to create
 * @param {object} [options]
 * @param {boolean} [options.concatTypes = true] join names for nested keys
 * @example
 *
 * const { user } = createActions({ user: { request: ['a', 'b']}});
 * dispatch(user('stuff'))
 */
export const createActions = (entries, options = {}) => {
  // no value provided:
  if (!entries) {
    return {};
  }

  const { concatTypes = true, prepend = '' } = options;

  const isPlainObject = o => !!o && typeof o === 'object' && !Array.isArray(o);
  const getNestedObject = o => {
    const cKey = []; // current list of keys
    const createNestedObject = obj =>
      Object.entries(obj).reduce((cv, [key, val], i, arr) => {
        const upperKey = key.toUpperCase();
        const lowerKey = key.toLowerCase();
        if (concatTypes) {
          cKey.push(upperKey);
        }
        if (isPlainObject(val)) {
          cv[lowerKey] = createNestedObject(val);
        } else {
          // if we're done drilling down into objects
          const type = cKey.length > 0 ? cKey.join('/') : key.toUpperCase();
          const prepare =
            val[0] !== undefined
              ? val[0]
              : (payload, error = null, meta = null) => ({
                  payload,
                  ...(meta && { meta }),
                  ...(error && { error }),
                });
          const inputVal = [prepare, ...val.splice(1)];
          // pass paylod to createAction
          cv[lowerKey] = createAction(`${prepend}${type}`, ...inputVal);
          // query key to check if request
          const matches = getRequestMatch(upperKey);
          if (matches && !cv._meta) {
            cv._meta = {
              ...cv._meta,
              isFetching: `${cKey[0].toLowerCase()}IsFetching${getCapitalized(
                cKey[cKey.length - 2]
              )}`,
              isFetched: `${cKey[0].toLowerCase()}HasFetched${getCapitalized(
                cKey[cKey.length - 2]
              )}`,
            };
          }

          // always remove the last key when done
          cKey.pop();
          if (i === arr.length - 1) {
            // if we've reached the end of group, go up to start next chain
            cKey.pop();
          }
        }

        return cv;
      }, {});

    return createNestedObject(o);
  };

  return getNestedObject(entries);
};

/**
 * @method sagaRequest
 * @desc create api request handler for saga series
 * @param {array} params The api call and request data
 * @param {functon||array} successActs action to run on success
 * @param {function} [successDataTrns] functoin to handle data processing before passed to success
 * @param {functon|array} failActs actions to run on fail
 * @return {generator} the request handler generator
 * @example
 *
 * const apiCalls = yield all ([
 *  fork(sagaRequest, {
 *    params: [myFunc, { some: 'params' }],
 *    successActs: [func1, func2],
 *    successDataTrns: data => { my: data },
 *    failActs: ({ message }) => console.log(message)
 *  })
 * ]);
 */
// eslint-disable-next-line object-shorthand, consistent-return
export const sagaRequest = function* ({
  params,
  successActs,
  successDataTrns = null,
  failActs,
}) {
  const { call, put, all } = require('redux-saga/effects');
  try {
    const response = yield call(...params);
    let returnData = response.data;
    if (
      successDataTrns &&
      (typeof successDataTrns === 'function' ||
        successDataTrns instanceof Function)
    ) {
      returnData = successDataTrns(response.data);
    }
    if (Array.isArray(successActs)) {
      const successes = successActs.map(act => put(act(returnData)));
      yield all(successes);
    } else {
      yield put(successActs(returnData));
    }
    return returnData;
  } catch (e) {
    if (Array.isArray(failActs)) {
      const failures = failActs.map(act => put(act(e)));
      yield all(failures);
    } else {
      yield put(failActs(e.message));
    }
  }
};

export { createAction as actionCreator } from '@reduxjs/toolkit';

export default {
  createActions,
  getCapitalized,
  getRequestMatch,
};
