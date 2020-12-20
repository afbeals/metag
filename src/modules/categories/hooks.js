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
      _meta: { isFetched: getAllisFetched, isFetching: getAllisFetching },
    },
    add: {
      request: add,
      cancel: addCancel,
      _meta: { isFetching: addIsFetching },
    },
    create: {
      request: create,
      cancel: createCancel,
      _meta: { isFetching: createIsFetching },
    },
    update: {
      request: update,
      cancel: updateCancel,
      _meta: { isFetching: updateIsFetching },
    },
    delete: {
      request: deleteReq,
      cancel: deleteReqCancel,
      _meta: { isFetching: deleteIsFetching },
    },
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
    catCreateIsFetching: useSelector(store =>
      fetchSelector(store, createIsFetching)
    ),
    catUpdateIsFetching: useSelector(store =>
      fetchSelector(store, updateIsFetching)
    ),
    catDeleteIsFetching: useSelector(store =>
      fetchSelector(store, deleteIsFetching)
    ),
    catAddIsFetching: useSelector(store => fetchSelector(store, addIsFetching)),
    catAllIsFetched: useSelector(store =>
      fetchSelector(store, getAllisFetched)
    ),
    // actions
    catFetch: () => dispatch(getAll()),
    catFetchCancel: () => dispatch(getAllCancel()),
    catCreate: info => dispatch(create(info)),
    catCreateCancel: () => dispatch(createCancel()),
    catAdd: info => dispatch(add(info)),
    catAddCancel: () => dispatch(addCancel()),
    catUpdate: info => dispatch(update(info)),
    catUpdateCancel: () => dispatch(updateCancel()),
    catDelete: info => dispatch(deleteReq(info)),
    catDeleteCancel: () => dispatch(deleteReqCancel()),
    catReset: () => dispatch(resetCategories()),
  };

  const propTypes = {
    catStore: object.isRequired,
    catList: object,
    catListArray: array,
    catAllIsFetching: bool.isRequired,
    catCreateIsFetching: bool.isRequired,
    catUpdateIsFetching: bool.isRequired,
    catDeleteIsFetching: bool.isRequired,
    catAddIsFetching: bool.isRequired,
    catAllIsFetched: bool.isRequired,
    catFetch: func.isRequired,
    catFetchCancel: func.isRequired,
    catAdd: func.isRequired,
    catAddCancel: func.isRequired,
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
