// External

// Internal
import { createActions } from '~GlobalUtil/normalize';

// Constants
const MODULE = `${process.env.REACT_APP_MODULE_NAME}/`; // module action prefix

// Actions
const actions = createActions(
  {
    movies: {
      all: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      under_cat: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      under_tag: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
      },
      search: {
        request: [],
        success: [],
        fail: [],
        cancel: [],
        clear: [],
      },
      select: {
        movie: [],
      },
      add: {
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
      update: {
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
