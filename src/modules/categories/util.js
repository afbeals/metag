// Internal
import { arrayToIndexed } from '~GlobalUtil/normalize';

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

  /**
   *  @name normalizeCategoriesArray
   * @desc normalize data from api for categories
   */
  normalizeCategoriesArray: catArray =>
    arrayToIndexed({
      array: catArray.map(({ created_at, modified_at = null, ...rest }) => ({
        date: modified_at || created_at,
        ...rest,
      })),
    }),
};

export default { ...categoriesUtilityDefs, ...categoriesUtilityFuncs };
