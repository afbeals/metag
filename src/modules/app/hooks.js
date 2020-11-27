// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, bool, func } from 'prop-types';

// Internal
import * as appSelectors from './selectors';
import appActions from './actions';

// Constants
const appHooks = {
  /**
   * @method useAppStore
   * @desc connect to app store
   * @example
   * const { modalIsVisiable } = useAppStore();
   */
  useAppStore: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      appStore: useSelector(appSelectors.getAppStore),
      overlayIsVisible: useSelector(appSelectors.appOverlayIsVisible),
      appNotification: useSelector(appSelectors.appNotification),
      modalIsVisible: useSelector(appSelectors.appModalIsVisible),
      // actions
      appShowOverlay: () => dispatch(appActions.appShowOverlay()),
      appHideOverlay: () => dispatch(appActions.appHideOverlay()),
      appShowNotify: info => dispatch(appActions.appShowNotify(info)),
      appHideNotify: () => dispatch(appActions.appHideNotify()),
      appShowModal: () => dispatch(appActions.appShowModal()),
      appHideModal: () => dispatch(appActions.appHideModal()),
    };

    const propTypes = {
      appStore: object.isRequired,
      overlayIsVisible: bool.isRequired,
      appNotification: object,
      modalIsVisible: bool.isRequired,
      appShowOverlay: func.isRequired,
      appHideOverlay: func.isRequired,
      appShowNotify: func.isRequired,
      appHideNotify: func.isRequired,
      appShowModal: func.isRequired,
      appHideModal: func.isRequired,
    };

    checkPropTypes(propTypes, props, 'prop', `Hook: useAppStore`);

    return props;
  },

  /**
   * @method useAppModal
   * @desc connect to app modal store
   */
  useAppModal: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      modalIsVisible: useSelector(appSelectors.appModalIsVisible),
      // actions
      appShowModal: () => dispatch(appActions.appShowModal()),
      appHideModal: () => dispatch(appActions.appHideModal()),
    };

    const propTypes = {
      modalIsVisible: bool.isRequired,
      appShowModal: func.isRequired,
      appHideModal: func.isRequired,
    };

    checkPropTypes(propTypes, props, 'prop', `Hook: useAppModal`);

    return props;
  },

  /**
   * @method useAppNotification
   * @desc connect to app notification store
   */
  useAppNotification: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      appNotification: useSelector(appSelectors.appNotification),
      // actions
      appShowNotify: info => dispatch(appActions.appShowNotify(info)),
      appHideNotify: () => dispatch(appActions.appHideNotify()),
    };

    const propTypes = {
      appNotification: object,
      appShowNotify: func.isRequired,
      appHideNotify: func.isRequired,
    };

    checkPropTypes(propTypes, props, 'prop', `Hook: useAppNotification`);

    return props;
  },

  /**
   * @method useAppOverlay
   * @desc connect to app overlay store
   */
  useAppOverlay: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      overlayIsVisible: useSelector(appSelectors.appOverlayIsVisible),
      // actions
      appShowOverlay: () => dispatch(appActions.appShowOverlay()),
      appHideOverlay: () => dispatch(appActions.appHideOverlay()),
    };

    const propTypes = {
      overlayIsVisible: bool.isRequired,
      appShowOverlay: func.isRequired,
      appHideOverlay: func.isRequired,
    };

    checkPropTypes(propTypes, props, 'prop', `Hook: useAppOverlay`);

    return props;
  },
};

export default appHooks;
