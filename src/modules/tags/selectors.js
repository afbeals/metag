// External
import { createSelector } from 'reselect'; // selector package

// Internal
import { indexedToArray } from '~GlobalUtil/normalize';

// Constants
const getTags = state => state.tags; // select item in store to use

/**
 * @name getTagsStore
 * @param {object} getTags store object
 * @return {object} the store data
 */
export const getTagsStore = createSelector([getTags], store => store);

/**
 * @name getTagsList
 * @param {object} getTagsStore store object
 * @return {object} the store data
 */
export const getTagsList = createSelector([getTagsStore], store => store.list);

/**
 * @name getTagsListArray
 * @param {object} getTagsStore store object
 * @return {array} the tag list array
 */
export const getTagsListArray = createSelector([getTagsStore], store =>
  indexedToArray({ indexedList: store.list })
);
