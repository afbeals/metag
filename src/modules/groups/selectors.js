// External
import { createSelector } from 'reselect'; // selector package

// Internal
import { indexedToArray } from '~GlobalUtil/normalize';

// Constants
const getGroups = state => state.groups; // select item in store to use

/**
 * @name getGroupsStore
 * @param {object} getGroups store object
 * @return {object} the store data
 */
export const getGroupsStore = createSelector([getGroups], store => store);

/**
 * @name getGroupsList
 * @param {object} getGroupsStore store object
 * @return {object} the store data
 */
export const getGroupsList = createSelector(
  [getGroupsStore],
  store => store.list
);

/**
 * @name getGroupsListArray
 * @param {object} getGroupsStore store object
 * @return {array} the tag list array
 */
export const getGroupsListArray = createSelector([getGroupsList], store =>
  indexedToArray({ indexedList: store })
);
