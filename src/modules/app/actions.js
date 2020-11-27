// External

// Internal
import types from './types';
import { actionCreator } from '~GlobalUtil/normalize';

// Constants
const {
  MODAL_HIDE,
  MODAL_SHOW,
  NOTIFY_SHOW,
  NOTIFY_HIDE,
  OVERLAY_SHOW,
  OVERLAY_HIDE,
} = types;

// Actions
const actions = {
  /**
   * @function appShowOverlay
   * @desc display app overlay
   */
  appShowOverlay: () => actionCreator(OVERLAY_SHOW),

  /**
   * @function appHideOverlay
   * @desc hide app overlay
   */
  appHideOverlay: () => actionCreator(OVERLAY_HIDE),

  /**
   * @function appShowNotify
   * @param {object} info
   * @param {ENUM} info.type the message type from enum
   * @param  {number} [info.timer=2500] The amount of time to show message in ms
   * @param  {string} info.msg The message to display
   * @desc display the snackbar
   */
  appShowNotify: info => actionCreator(NOTIFY_SHOW, info),

  /**
   * @function appHideNotify
   * @desc hide the snackbar
   */
  appHideNotify: () => actionCreator(NOTIFY_HIDE),

  /**
   * @function appShowModal
   * @desc display the modal
   */
  appShowModal: () => actionCreator(MODAL_SHOW),

  /**
   * @function appHideModal
   * @desc hide the modal
   */
  appHideModal: () => actionCreator(MODAL_HIDE),
};

export default actions;
