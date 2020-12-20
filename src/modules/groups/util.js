// Internal
import { arrayToIndexed } from '~GlobalUtil/normalize';

const groupsUtilityDefs = {};

const groupsUtilityFuncs = {
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
    ...groupsUtilityFuncs.buildInitialStore(),
    ...props,
  }),

  /**
   *  @name normalizeGroupsArray
   * @desc normalize data from api for groups
   */
  normalizeGroupsArray: groupArray =>
    arrayToIndexed({
      array: groupArray.map(
        ({ id, name, created_at, modified_at = null, amount }) => ({
          id,
          name,
          date: modified_at || created_at,
          amount,
        })
      ),
    }),
};

export default { ...groupsUtilityDefs, ...groupsUtilityFuncs };
