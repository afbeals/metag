// External

// Internal
import { createActions } from '~GlobalUtil/normalize';

// Constants
const MODULE = `${process.env.REACT_APP_MODULE_NAME}/`; // module

// Actions
const actions = createActions(
  {
    user: {
      login: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      session_login: {
        attempt: [],
      },
      reset: [],
    },
  },
  { prepend: MODULE }
);

export default actions;
