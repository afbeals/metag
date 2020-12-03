// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func, array } from 'prop-types';

// Internal
import * as selectors from './selectors';
import categoriesActions from './actions';

const {
  categories: {
    getall: { request: getAll, cancel: getAllCancel },
    getavailable: { request: getAvailable, cancel: getAvailableCancel },
    create: { request: create, cancel: createCancel },
    update: { request: update, cancel: updateCancel },
    delete: { request: deleteReq, cancel: deleteReqCancel },
    reset: resetCategories,
  },
} = categoriesActions;

// Constants
const categoriesHooks = {
  /**
   * @method useCategoriesStore
   * @desc connect to category store
   * @example
   * const { catList } = useCategoriesStore();
   */
  useCategoriesStore: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      catStore: useSelector(selectors.getCategoriesStore),
      catList: useSelector(selectors.getCategoriesList),
      catListArray: useSelector(selectors.getCategoriesListArray),
      // actions
      catFetch: () => dispatch(getAll()),
      catFetchCancel: () => dispatch(getAllCancel()),
      catFetchAvail: () => dispatch(getAvailable()),
      catFetchAvailCancel: () => dispatch(getAvailableCancel()),
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
      catFetch: func.isRequired,
      catFetchCancel: func.isRequired,
      catFetchAvail: func.isRequired,
      catFetchAvailCancel: func.isRequired,
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
  },
};

export default categoriesHooks;
