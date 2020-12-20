// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func, array, bool } from 'prop-types';

// Internal
import * as selectors from './selectors';
import { createFetchSelector } from '../fetch/selectors';
import tagsActions from './actions';

const {
  tags: {
    get: {
      request: getTags,
      cancel: getTagsCancel,
      _meta: { isFetching: getIsFetching },
    },
    create: {
      request: createTags,
      cancel: createTagsCancel,
      _meta: { isFetching: createIsFetching },
    },
    update: {
      request: updateTags,
      cancel: updateTagsCancel,
      _meta: { isFetching: updateIsFetching },
    },
    delete: {
      request: deleteTags,
      cancel: deleteTagsCancel,
      _meta: { isFetching: deleteIsFetching },
    },
    reset: resetTags,
  },
} = tagsActions;

// Constants
/**
 * @method useTagsStore
 * @desc connect to tag store
 * @example
 * const { taglist } = useTagsStore();
 */
export const useTagsStore = () => {
  const dispatch = useDispatch();
  const fetchSelector = createFetchSelector();

  const props = {
    // selectors
    tagsStore: useSelector(selectors.getTagsStore),
    tagsList: useSelector(selectors.getTagsList),
    tagsListArray: useSelector(selectors.getTagsListArray),
    tagsIsFetching: useSelector(store => fetchSelector(store, getIsFetching)),
    tagCreateIsFetching: useSelector(store =>
      fetchSelector(store, createIsFetching)
    ),
    tagUpdateIsFetching: useSelector(store =>
      fetchSelector(store, updateIsFetching)
    ),
    tagDeleteIsFetching: useSelector(store =>
      fetchSelector(store, deleteIsFetching)
    ),
    // actions
    tagsFetch: () => dispatch(getTags()),
    tagsFetchCancel: () => dispatch(getTagsCancel()),
    tagsCreate: info => dispatch(createTags(info)),
    tagsCreateCancel: () => dispatch(createTagsCancel()),
    tagsUpdate: info => dispatch(updateTags(info)),
    tagsUpdateCancel: () => dispatch(updateTagsCancel()),
    tagsDelete: info => dispatch(deleteTags(info)),
    tagsDeleteCancel: () => dispatch(deleteTagsCancel()),
    tagsReset: () => dispatch(resetTags()),
  };

  const propTypes = {
    tagsStore: object.isRequired,
    tagsList: object,
    tagsListArray: array,
    tagsIsFetching: bool.isRequired,
    tagCreateIsFetching: bool.isRequired,
    tagUpdateIsFetching: bool.isRequired,
    tagDeleteIsFetching: bool.isRequired,
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
};

export default {
  useTagsStore,
};
