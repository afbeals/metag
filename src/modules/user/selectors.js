// External
import { createSelector } from 'reselect'; // selector package

// Constants
const getUser = state => state.user; // select item in store to use

/**
 * @name getUserStore
 * @param {object} getUser store object
 * @return {object} the store data
 */
export const getUserStore = createSelector([getUser], store => store);

/**
 * @name getUserInfo
 * @param {object} getUserStore store object
 * @return {object} the store data
 */
export const getUserInfo = createSelector([getUserStore], store => store.info);
