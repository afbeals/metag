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
 * @function constructClass
 * @desc construct class based on array of strings
 * @param {array} classnames list of strings/expressions to evaluate and concat
 * @example
 * const list = ['open', 'full', 2>3 ? 1 : 2, 'classname', null, '', false || 'true' ];
 * const classList = constructClass(list);
 *
 * // output: 'open full 2 classname true'
 */

export const constructClass = classnames =>
  classnames.filter(cname => !!cname).join(' ');

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
      yield put(failActs(e.response?.data?.message || e.message));
    }
  }
};

/**
 * @desc indexes array list by indexer (default = 'id')
 * @method arrayToIndexed
 * @param {object} param
 * @param {array} param.array array to be indexed
 * @param {(string|function)} [param.indexer=id]  string key single level deep, function to return key
 * @param {function} normalizer  function to return modified item
 * @return {object} returns indexed list
 * @example
 *
 * const indexed = arrayToIndexed({ array: [{ id: 1}]}); // { 1: { id: 1 }}
 */
export const arrayToIndexed = ({ array, indexer = 'id', normalizer }) => {
  if (!array || !Array.isArray(array) || array.length < 1) return {};
  const indexedList = {};
  const newArray = array.slice();
  let normalizeVal;
  if (typeof normalizer === 'function' || normalizer instanceof Function) {
    normalizeVal = normalizer;
  } else {
    normalizeVal = value => value;
  }
  newArray.forEach((item, index, arr) => {
    if (typeof indexer === 'function' || indexer instanceof Function) {
      const keyValue = indexer(item, index, arr);
      indexedList[keyValue] = normalizeVal(item);
    } else {
      indexedList[item[indexer]] = normalizeVal(item);
    }
  });
  return indexedList;
};

/**
 * @desc Function for sorting  list
 * @method listSorter
 * @param {object} params
 * @param {array} params.array array to be sorted
 * @param {string} [params.sort] ' asc' or 'desc' (default 'asc')
 * @param {string} [params.sortField] field to sort by (single layer deep, default 'id')
 * @return new sorted array
 * @example
 *
 * let newArr = listSorter({ array: [1,3,2]}); // [1,2,3]
 */
export const listSorter = ({ array, sort = 'asc', sortField = 'id' }) => {
  if (!array || !Array.isArray(array)) {
    // eslint-disable-next-line no-console
    console.warn('non-array supplied to listSorter');
    return [];
  }
  if (sort.toLowerCase() === 'asc') {
    return [...array].sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
  }
  return [...array].sort((a, b) => {
    if (a[sortField] > b[sortField]) return -1;
    if (a[sortField] < b[sortField]) return 1;
    return 0;
  });
};

/**
 * @desc pushed indexed obect items to array
 * @method indexedToArray
 * @param {object} params
 * @param {object} params.indexedList indexed object
 * @param {string} [params.sort] direction to sort list (default: 'asc')
 * @param {string} [params.sortField] field to sort by (default: 'id')
 * @return {array} returns new array with previously indexed objects
 * @example
 * const arr = indexedToArrary({ blah: { id: 1}}) // [{ id: 1}]
 */
export const indexedToArray = ({
  indexedList = null,
  sort = null,
  sortField = 'id',
}) => {
  if (!indexedList) return [];
  let newArr;
  if (sort) {
    newArr = listSorter({
      array: newArr,
      sort,
      sortField,
    });
  } else {
    newArr = Object.values(indexedList);
  }
  return newArr;
};

/**
 * @name convertSecToTime
 * @desc convert seconds to time stamp
 * @param {Number} sec The amount of seconds to convert
 * const time = convertSecToTime(60); // 00:01:00
 */
export const convertSecToTime = sec => {
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec - hrs * 3600) / 60);
  let seconds = sec - hrs * 3600 - min * 60;
  seconds = Math.round(seconds * 100) / 100;

  const hrsStr = hrs < 10 ? '0' + hrs : hrs;
  const minStr = min < 10 ? '0' + min : min;
  const secStr = seconds < 10 ? '0' + seconds : seconds;
  return `${hrsStr}:${minStr}:${secStr}`;
};

export { createAction as actionCreator } from '@reduxjs/toolkit';

export default {
  constructClass,
  convertSecToTime,
  createActions,
  getCapitalized,
  getRequestMatch,
  arrayToIndexed,
  indexedToArray,
  sagaRequest,
  listSorter,
};
