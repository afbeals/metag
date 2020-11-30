const userUtilityDefs = {};

const userUtilityFuncs = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({
    info: null,
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...userUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...userUtilityDefs, ...userUtilityFuncs };
