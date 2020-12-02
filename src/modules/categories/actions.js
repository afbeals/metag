// External

// Internal
import { createActions } from '~GlobalUtil/normalize';

// Constants
const MODULE = `${process.env.REACT_APP_MODULE_NAME}/`; // module action prefix

// Actions
const actions = createActions(
  {
    categories: {
      getall: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      getavailable: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      create: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      update: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      delete: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      reset: [],
    },
  },
  { prepend: MODULE }
);

export default actions;
