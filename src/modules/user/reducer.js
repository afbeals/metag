// Internal
import actions from './actions';
import util from './util';

// Constants
const initialStore = util.buildInitialStore();
const {
  user: {
    login: { success: userLoginSuccess },
    reset: userReset,
  },
} = actions;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case userLoginSuccess.type: {
      const info = {
        ...payload,
      };
      return {
        ...state,
        info,
      };
    }

    case userReset.type: {
      return initialStore;
    }

    default:
      return state;
  }
}
