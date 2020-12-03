// Internal
import util from './util';
import appActions from './actions';

// Constants
const initialStore = util.buildInitialStore();
const {
  app: {
    modal: { show: appShowModal, hide: appHideModal },
    notify: { show: appShowNotify, hide: appHideNotify },
    overlay: { show: appShowOverlay, hide: appHideOverlay },
  },
} = appActions;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case appShowModal.type: {
      return {
        ...state,
        showModal: true,
      };
    }

    case appHideModal.type: {
      return {
        ...state,
        showModal: false,
      };
    }

    case appShowNotify.type: {
      return {
        ...state,
        notification: payload,
      };
    }

    case appHideNotify.type: {
      return {
        ...state,
        notification: null,
      };
    }

    case appShowOverlay.type: {
      return {
        ...state,
        showOverlay: Math.max(0, state.showOverlay + 1),
      };
    }

    case appHideOverlay.type: {
      return {
        ...state,
        showOverlay: Math.max(0, state.showOverlay - 1),
      };
    }

    default:
      return state;
  }
}
