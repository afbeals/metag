// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func, array } from 'prop-types';

// Internal
import * as selectors from './selectors';
import tagsActions from './actions';

const {
  tags: {
    get: { request: getTags, cancel: getTagsCancel },
    create: { request: createTags, cancel: createTagsCancel },
    update: { request: updateTags, cancel: updateTagsCancel },
    delete: { request: deleteTags, cancel: deleteTagsCancel },
    reset: resetTags,
  },
} = tagsActions;

// Constants
const tagsHooks = {
  /**
   * @method useTagsStore
   * @desc connect to tag store
   * @example
   * const { taglist } = useTagsStore();
   */
  useTagsStore: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      tagsStore: useSelector(selectors.getTagsStore),
      tagsList: useSelector(selectors.getTagsList),
      tagsListArray: useSelector(selectors.getTagsListArray),
      // actions
      tagsFetch: () => dispatch(getTags()),
      tagsFetchFail: () => dispatch(getTagsCancel()),
      tagsCreate: info => dispatch(createTags(info)),
      tagsCreateFail: () => dispatch(createTagsCancel()),
      tagsDelete: info => dispatch(updateTags(info)),
      tagsDeleteFail: () => dispatch(updateTagsCancel()),
      tagsUpdate: info => dispatch(deleteTags(info)),
      tagsUpdateFail: () => dispatch(deleteTagsCancel()),
      tagsReset: () => dispatch(resetTags()),
    };

    const propTypes = {
      tagsStore: object.isRequired,
      tagsList: object,
      tagsListArray: array,
      tagsFetch: func.isRequired,
      tagsFetchFail: func.isRequired,
      tagsCreate: func.isRequired,
      tagsCreateFail: func.isRequired,
      tagsDelete: func.isRequired,
      tagsDeleteFail: func.isRequired,
      tagsUpdate: func.isRequired,
      tagsUpdateFail: func.isRequired,
      tagsReset: func.isRequired,
    };

    checkPropTypes(propTypes, props, 'prop', `Hook: useTagsStore`);

    return props;
  },
};

export default tagsHooks;
