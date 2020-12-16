// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, bool, func } from 'prop-types';

// Internal
import * as appSelectors from './selectors';
import appActions from './actions';

// Constants
const {
  app: {
    modal: { show: appShowModal, hide: appHideModal },
    notify: { show: appShowNotify, hide: appHideNotify },
    overlay: { show: appShowOverlay, hide: appHideOverlay },
  },
} = appActions;

/**
 * @method useAppStore
 * @desc connect to app store
 * @example
 * const { modalIsVisiable } = useAppStore();
 */
export const useAppStore = () => {
  const dispatch = useDispatch();

  const props = {
    // selectors
    appStore: useSelector(appSelectors.getAppStore),
    overlayIsVisible: useSelector(appSelectors.appOverlayIsVisible),
    appNotification: useSelector(appSelectors.appNotification),
    modalIsVisible: useSelector(appSelectors.appModalIsVisible),
    // actions
    appShowOverlay: () => dispatch(appShowOverlay()),
    appHideOverlay: () => dispatch(appHideOverlay()),
    appShowNotify: info => dispatch(appShowNotify(info)),
    appHideNotify: () => dispatch(appHideNotify()),
    appShowModal: () => dispatch(appShowModal()),
    appHideModal: () => dispatch(appHideModal()),
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
};

/**
 * @method useAppModal
 * @desc connect to app modal store
 */
export const useAppModal = () => {
  const dispatch = useDispatch();

  const props = {
    // selectors
    modalIsVisible: useSelector(appSelectors.appModalIsVisible),
    // actions
    appShowModal: () => dispatch(appShowModal()),
    appHideModal: () => dispatch(appHideModal()),
  };

  const propTypes = {
    modalIsVisible: bool.isRequired,
    appShowModal: func.isRequired,
    appHideModal: func.isRequired,
  };

  checkPropTypes(propTypes, props, 'prop', `Hook: useAppModal`);

  return props;
};

/**
 * @method useAppNotification
 * @desc connect to app notification store
 */
export const useAppNotification = () => {
  const dispatch = useDispatch();

  const props = {
    // selectors
    appNotification: useSelector(appSelectors.appNotification),
    // actions
    appShowNotify: info => dispatch(appShowNotify(info)),
    appHideNotify: () => dispatch(appHideNotify()),
  };

  const propTypes = {
    appNotification: object,
    appShowNotify: func.isRequired,
    appHideNotify: func.isRequired,
  };

  checkPropTypes(propTypes, props, 'prop', `Hook: useAppNotification`);

  return props;
};

/**
 * @method useAppOverlay
 * @desc connect to app overlay store
 */
export const useAppOverlay = () => {
  const dispatch = useDispatch();

  const props = {
    // selectors
    overlayIsVisible: useSelector(appSelectors.appOverlayIsVisible),
    // actions
    appShowOverlay: () => dispatch(appShowOverlay()),
    appHideOverlay: () => dispatch(appHideOverlay()),
  };

  const propTypes = {
    overlayIsVisible: bool.isRequired,
    appShowOverlay: func.isRequired,
    appHideOverlay: func.isRequired,
  };

  checkPropTypes(propTypes, props, 'prop', `Hook: useAppOverlay`);

  return props;
};

export default {
  useAppStore,
  useAppOverlay,
  useAppModal,
  useAppNotification,
};
