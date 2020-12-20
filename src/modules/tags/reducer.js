// Internal
import tagsActions from './actions';
import util from './util';

// Constants
const initialStore = util.buildInitialStore();
const {
  tags: {
    get: { success: getTagsSuccess },
    create: { success: createTagsSuccess },
    update: { success: updateTagsSuccess },
    delete: { success: deleteTagsSuccess },
    reset: tagsReset,
  },
} = tagsActions;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case getTagsSuccess.type: {
      return {
        ...state,
        list: payload,
      };
    }

    case createTagsSuccess.type:
    case updateTagsSuccess.type: {
      return {
        ...state,
        list: {
          ...state.list,
          ...payload,
        },
      };
    }

    case deleteTagsSuccess.type: {
      const { [payload]: removed, ...rest } = { ...state.list };
      return {
        ...state,
        list: rest,
      };
    }

    case tagsReset.type: {
      return initialStore;
    }

    default:
      return state;
  }
}
