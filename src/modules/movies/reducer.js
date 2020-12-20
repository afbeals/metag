// Internal
import moviesActions from './actions';
import util from './util';

// Constants
const initialStore = util.buildInitialStore();
const {
  movies: {
    all: { success: allSuccess },
    under_cat: { success: under_catSuccess },
    under_group: { success: under_groupSuccess },
    under_tag: { success: under_tagSuccess },
    search: { request: searchReq, success: searchSuccess, clear: searchClear },
    select: { movie: selectMovie },
    add: { success: addSuccess },
    delete: { success: deleteSuccess },
    update: { success: updateSuccess },
    reset: resetMovie,
  },
} = moviesActions;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case under_catSuccess.type:
    case under_tagSuccess.type:
    case under_groupSuccess.type:
    case searchSuccess.type:
    case allSuccess.type: {
      return {
        ...state,
        list: payload,
      };
    }

    case addSuccess.type:
    case updateSuccess.type: {
      return {
        ...state,
        list: {
          ...state.list,
          ...payload,
        },
      };
    }

    case deleteSuccess.type: {
      const { [payload]: removed, ...rest } = { ...state.list };
      const list = Object.values(rest).length > 0 ? rest : null;
      return {
        ...state,
        list,
      };
    }

    case searchClear.type: {
      return {
        ...state,
        search: null,
      };
    }

    case searchReq.type: {
      const { prevId = 0, ...rest } = payload;
      return {
        ...state,
        search: {
          prevId,
          ...rest,
        },
      };
    }

    case selectMovie.type: {
      return {
        ...state,
        selectedId: payload,
      };
    }

    case resetMovie.type: {
      return initialStore;
    }

    default:
      return state;
  }
}
