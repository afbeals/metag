const appUtilityDefs = {};

const appUtilityFuncs = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({
    showOverlay: 0,
    showModal: false,
    notification: null,
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...appUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...appUtilityDefs, ...appUtilityFuncs };
