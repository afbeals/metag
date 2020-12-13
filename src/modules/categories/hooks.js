// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func, array, bool } from 'prop-types';

// Internal
import * as selectors from './selectors';
import categoriesActions from './actions';
import { createFetchSelector } from '../fetch/selectors';

const {
  categories: {
    getall: {
      request: getAll,
      cancel: getAllCancel,
      _meta: { isFetched: getAllisFetched, getAllisFetching },
    },
    create: { request: create, cancel: createCancel },
    update: { request: update, cancel: updateCancel },
    delete: { request: deleteReq, cancel: deleteReqCancel },
    reset: resetCategories,
  },
} = categoriesActions;

// Constants

/**
 * @method useCategoriesStore
 * @desc connect to category store
 * @example
 * const { catList } = useCategoriesStore();
 */
export const useCategoriesStore = () => {
  const dispatch = useDispatch();
  const fetchSelector = createFetchSelector();

  const props = {
    // selectors
    catStore: useSelector(selectors.getCategoriesStore),
    catList: useSelector(selectors.getCategoriesList),
    catListArray: useSelector(selectors.getCategoriesListArray),
    catAllIsFetching: useSelector(store =>
      fetchSelector(store, getAllisFetching)
    ),
    catAllIsFetched: useSelector(store =>
      fetchSelector(store, getAllisFetched)
    ),
    // actions
    catFetch: () => dispatch(getAll()),
    catFetchCancel: () => dispatch(getAllCancel()),
    catCreate: info => dispatch(create(info)),
    catCreateCancel: () => dispatch(createCancel()),
    catDelete: info => dispatch(update(info)),
    catDeleteCancel: () => dispatch(updateCancel()),
    catUpdate: info => dispatch(deleteReq(info)),
    catUpdateCancel: () => dispatch(deleteReqCancel()),
    catReset: () => dispatch(resetCategories()),
  };

  const propTypes = {
    catStore: object.isRequired,
    catList: object,
    catListArray: array,
    catAllIsFetching: bool.isRequired,
    catAllIsFetched: bool.isRequired,
    catFetch: func.isRequired,
    catFetchCancel: func.isRequired,
    catCreate: func.isRequired,
    catCreateCancel: func.isRequired,
    catDelete: func.isRequired,
    catDeleteCancel: func.isRequired,
    catUpdate: func.isRequired,
    catUpdateCancel: func.isRequired,
    catReset: func.isRequired,
  };

  checkPropTypes(propTypes, props, 'prop', `Hook: useCategoriesStore`);

  return props;
};

export default {
  useCategoriesStore,
};
