// External
import { createSelector } from 'reselect'; // selector package

// Constants
const getApp = state => state.app; // select item in store to use

/**
 * @name getAppStore
 * @param {object} getApp store object
 * @return {object} the store data
 */
export const getAppStore = createSelector([getApp], store => store);

/**
 * @name appOverlayIsVisible
 * @param {object} store store object
 * @return {boolean} the overlay display status
 */
export const appOverlayIsVisible = store => !!getApp(store).showOverlay;

/**
 * @name appNotification
 * @param {object} getAppStore store object
 * @return {(object|null)} the notification info
 */
export const appNotification = createSelector(
  [getAppStore],
  store => store.notification
);

/**
 * @name appModalIsVisible
 * @param {object} store store object
 * @return {(object|null)} the notification info
 */
export const appModalIsVisible = store => !!getApp(store).showModal;
