// Constants
const MODULE = `${process.env.REACT_APP_MODULE_NAME}/APP/`; // module action prefix

const actionTypes = {
  MODAL_SHOW: `${MODULE}MODAL_SHOW`,
  MODAL_HIDE: `${MODULE}MODAL_HIDE`,
  NOTIFY_SHOW: `${MODULE}NOTIFY_SHOW`,
  NOTIFY_HIDE: `${MODULE}NOTIFY_HIDE`,
  OVERLAY_SHOW: `${MODULE}OVERLAY_SHOW`,
  OVERLAY_HIDE: `${MODULE}OVERLAY_HIDE`,
};

export default actionTypes;
