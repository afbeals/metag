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
      catFetchFail: () => dispatch(getAllCancel()),
      catFetchAvail: () => dispatch(getAvailable()),
      catFetchAvailFail: () => dispatch(getAvailableCancel()),
      catCreate: info => dispatch(create(info)),
      catCreateFail: () => dispatch(createCancel()),
      catDelete: info => dispatch(update(info)),
      catDeleteFail: () => dispatch(updateCancel()),
      catUpdate: info => dispatch(deleteReq(info)),
      catUpdateFail: () => dispatch(deleteReqCancel()),
      catReset: () => dispatch(resetCategories()),
    };

    const propTypes = {
      catStore: object.isRequired,
      catList: object,
      catListArray: array,
      catFetch: func.isRequired,
      catFetchFail: func.isRequired,
      catFetchAvail: func.isRequired,
      catFetchAvailFail: func.isRequired,
      catCreate: func.isRequired,
      catCreateFail: func.isRequired,
      catDelete: func.isRequired,
      catDeleteFail: func.isRequired,
      catUpdate: func.isRequired,
      catUpdateFail: func.isRequired,
      catReset: func.isRequired,
    };

    checkPropTypes(propTypes, props, 'prop', `Hook: useCategoriesStore`);

    return props;
  },
};

export default categoriesHooks;
