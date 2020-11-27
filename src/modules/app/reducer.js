// Internal
import types from './types';
import util from './util';

// Constants
const initialStore = util.buildInitialStore();
const {
  MODAL_HIDE,
  MODAL_SHOW,
  NOTIFY_SHOW,
  NOTIFY_HIDE,
  OVERLAY_SHOW,
  OVERLAY_HIDE,
} = types;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case MODAL_SHOW: {
      return {
        ...state,
        showModal: true,
      };
    }

    case MODAL_HIDE: {
      return {
        ...state,
        showModal: false,
      };
    }

    case NOTIFY_SHOW: {
      return {
        ...state,
        notification: payload,
      };
    }

    case NOTIFY_HIDE: {
      return {
        ...state,
        notification: null,
      };
    }

    case OVERLAY_SHOW: {
      return {
        ...state,
        showOverlay: Math.max(0, state.showOverlay + 1),
      };
    }

    case OVERLAY_HIDE: {
      return {
        ...state,
        showOverlay: Math.max(0, state.showOverlay - 1),
      };
    }

    default:
      return state;
  }
}
