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
      tagsFetchCancel: () => dispatch(getTagsCancel()),
      tagsCreate: info => dispatch(createTags(info)),
      tagsCreateCancel: () => dispatch(createTagsCancel()),
      tagsDelete: info => dispatch(updateTags(info)),
      tagsDeleteCancel: () => dispatch(updateTagsCancel()),
      tagsUpdate: info => dispatch(deleteTags(info)),
      tagsUpdateCancel: () => dispatch(deleteTagsCancel()),
      tagsReset: () => dispatch(resetTags()),
    };

    const propTypes = {
      tagsStore: object.isRequired,
      tagsList: object,
      tagsListArray: array,
      tagsFetch: func.isRequired,
      tagsFetchCancel: func.isRequired,
      tagsCreate: func.isRequired,
      tagsCreateCancel: func.isRequired,
      tagsDelete: func.isRequired,
      tagsDeleteCancel: func.isRequired,
      tagsUpdate: func.isRequired,
      tagsUpdateCancel: func.isRequired,
      tagsReset: func.isRequired,
    };

    checkPropTypes(propTypes, props, 'prop', `Hook: useTagsStore`);

    return props;
  },
};

export default tagsHooks;
