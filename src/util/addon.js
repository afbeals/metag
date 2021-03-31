// addon examp:
const exampSelector = state => state.val;
const addonKey = 'ADDON_KEY';

const exampAddon = (store, action) => {
  const state = store.getState();

  switch (action.type) {
    case 'ACTION_TYPE':
      return {
        ...action,
        addon: {
          ...action.addon,
          [addonKey]: {
            passValue: exampSelector(state),
          },
        },
      };

    default:
      return state;
  }
};

// middleware
export const addonMiddleware = store => next => action => {
  // Note: order can be important
  const addons = [exampAddon];

  // update action
  const updatedAction = addons.reduce(
    (prevAction, addon) => addon(store, prevAction),
    action
  );

  // Ensure core action preservation
  return next(updatedAction);
};
