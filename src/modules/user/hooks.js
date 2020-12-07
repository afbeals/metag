// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func } from 'prop-types';

// Internal
import * as selectors from './selectors';
import { createFetchSelector } from '../fetch/selectors';
import actions from './actions';

// Constants
const {
  user: {
    login: {
      request: userLoginRequest,
      success: userLoginSuccess,
      fail: userLoginFail,
      cancel: userLoginCancel,
      _meta: { isFetched, isFetching },
    },
    session_login: { request: userLoginSessionRequest },
    reset: userReset,
  },
} = actions;

/**
 * @method useUserStore
 * @desc connect to user store
 * @example
 * const { userInfo } = useUserStore();
 */
export const useUserStore = () => {
  const dispatch = useDispatch();
  const fetchSelector = createFetchSelector();

  const props = {
    // selectors
    userStore: useSelector(selectors.getUserStore),
    userInfo: useSelector(selectors.getUserInfo),
    userIsFetching: useSelector(store => fetchSelector(store, isFetching)),
    userIsFetched: useSelector(store => fetchSelector(store, isFetched)),
    // actions
    userLogin: info => dispatch(userLoginRequest(info)),
    userLoginSuccess: () => dispatch(userLoginSuccess()),
    userLoginFail: () => dispatch(userLoginFail()),
    userLoginCancel: () => dispatch(userLoginCancel()),
    userSessionRequest: () => dispatch(userLoginSessionRequest()),
    userReset: () => dispatch(userReset()),
  };

  const propTypes = {
    userStore: object.isRequired,
    userInfo: object,
    userLogin: func.isRequired,
    userLoginSuccess: func.isRequired,
    userLoginFail: func.isRequired,
    userLoginCancel: func.isRequired,
    userSessionRequest: func.isRequired,
    userReset: func.isRequired,
    appHideModal: func.isRequired,
  };

  checkPropTypes(propTypes, props, 'prop', `Hook: useUserStore`);

  return props;
};

export default {
  useUserStore,
};
