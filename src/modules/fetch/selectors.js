// External
import { createSelector } from 'reselect'; // selector package

// Constants
// select item in store to use
const getFetch = (state, key) => ({ store: state.fetch, key });

/**
 * @name getFetchStore
 * @param {object} getFetch store object
 * @return {object} the store data
 */
export const getFetchStore = createSelector([getFetch], ({ store }) => store);

/**
 * @desc create dynamic selector to returns fetch status of request
 * @name createFetchSelector
 * @param {object} getFetchStore
 * @param {object} getFetchStore.store store object
 * @param {string} getFetchStore.key key value to listen for
 * @return {boolean} the status of request
 */
export const createFetchSelector = () =>
  createSelector([getFetch], ({ store, key }) => !!store[key]);
