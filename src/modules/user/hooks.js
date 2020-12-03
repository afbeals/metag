// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func } from 'prop-types';

// Internal
import * as selectors from './selectors';
import actions from './actions';

// Constants
const {
  user: {
    login: {
      request: userLoginRequest,
      success: userLoginSuccess,
      fail: userLoginFail,
      cancel: userLoginCancel,
    },
    session_login: { request: userLoginSessionRequest },
    reset: userReset,
  },
} = actions;
const appHooks = {
  /**
   * @method useUserStore
   * @desc connect to user store
   * @example
   * const { userInfo } = useUserStore();
   */
  useUserStore: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      userStore: useSelector(selectors.getUserStore),
      userInfo: useSelector(selectors.getUserInfo),
      // actions
      userLogin: () => dispatch(userLoginRequest()),
      userLoginSuccess: () => dispatch(userLoginSuccess()),
      userLoginFail: info => dispatch(userLoginFail(info)),
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
  },
};

export default appHooks;
