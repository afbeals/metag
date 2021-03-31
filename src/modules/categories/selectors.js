// External
import { createSelector } from 'reselect'; // selector package

// Internal
import { indexedToArray } from '~GlobalUtil/normalize';

// Constants
const getCategories = state => state.categories; // select item in store to use

/**
 * @name getCategoriesStore
 * @param {object} getCategories store object
 * @return {object} the store data
 */
export const getCategoriesStore = createSelector(
  [getCategories],
  store => store
);

/**
 * @name getCategoriesList
 * @param {object} getCategoriesStore store object
 * @return {object} the store data
 */
export const getCategoriesList = createSelector(
  [getCategoriesStore],
  store => store.list
);

/**
 * @name getCategoriesListArray
 * @param {object} getCategoriesStore store object
 * @return {array} the tag list array
 */
export const getCategoriesListArray = createSelector(
  [getCategoriesList],
  store =>
    indexedToArray({ indexedList: store, sort: 'asc', sortField: 'name' })
);
