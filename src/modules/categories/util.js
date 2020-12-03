const categoriesUtilityDefs = {};

const categoriesUtilityFuncs = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({
    list: null,
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...categoriesUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...categoriesUtilityDefs, ...categoriesUtilityFuncs };
