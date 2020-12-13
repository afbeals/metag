// Internal
import categoriesActions from './actions';
import util from './util';

// Constants
const initialStore = util.buildInitialStore();
const {
  categories: {
    getall: { success: getAllSuccess },
    create: { success: createSuccess },
    update: { success: updateSuccess },
    delete: { success: deleteSuccess },
    reset: reset,
  },
} = categoriesActions;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case getAllSuccess.type: {
      return {
        ...state,
        list: payload,
      };
    }

    case createSuccess.type:
    case updateSuccess.type: {
      const currentList = { ...state.list };
      payload.forEach(({ id, ...rest }) => {
        currentList[id] = { id, ...rest };
      });
      return {
        ...state,
        list: currentList,
      };
    }

    case deleteSuccess.type: {
      const { [payload]: removed, ...rest } = { ...state.list };
      return {
        ...state,
        list: rest,
      };
    }

    case reset.type: {
      return initialStore;
    }

    default:
      return state;
  }
}
