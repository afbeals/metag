const moviesUtilityDefs = {};

const moviesUtilityFuncs = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({
    list: null,
    selectedId: null,
    search: null,
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...moviesUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...moviesUtilityDefs, ...moviesUtilityFuncs };
