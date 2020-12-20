// Internal
import { arrayToIndexed } from '~GlobalUtil/normalize';

const tagsUtilityDefs = {};

const tagsUtilityFuncs = {
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
    ...tagsUtilityFuncs.buildInitialStore(),
    ...props,
  }),

  /**
   *  @name normalizeTagsArray
   * @desc normalize data from api for tags
   */
  normalizeTagsArray: groupArray =>
    arrayToIndexed({
      array: groupArray.map(({ created_at, modified_at = null, ...rest }) => ({
        date: modified_at || created_at,
        ...rest,
      })),
    }),
};

export default { ...tagsUtilityDefs, ...tagsUtilityFuncs };
