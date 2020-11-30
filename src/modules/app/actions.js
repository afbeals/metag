// External

// Internal
import { createActions } from '~GlobalUtil/normalize';

// Constants
const MODULE = `${process.env.REACT_APP_MODULE_NAME}/`; // module

// Actions
/**
 * Notify Show
 *
 * @method
 * @name app.notify.show
 * @desc display the snackbar
 * @param {Object} info
 * @param {ENUM} info.type the message type from enum
 * @param  {Number} [info.timer=2500] The amount of time to show message in ms
 * @param  {String} info.msg The message to display
 *
 */
const actions = createActions(
  {
    app: {
      modal: {
        hide: [],
        show: [],
      },
      notify: {
        hide: [],
        show: [],
      },
      overlay: {
        hide: [],
        show: [],
      },
      reset: [],
    },
  },
  { prepend: MODULE }
);

export default actions;
