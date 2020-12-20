// Internal
import { arrayToIndexed } from '~GlobalUtil/normalize';

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
  /**
   *  @name normalizeMoviesArray
   * @desc normalize data from api for movies
   */
  normalizeMoviesArray: data =>
    arrayToIndexed({
      array: data.map(
        ({ tag_ids, movie_name, movie_id, alt_group, ...rest }) => ({
          ...rest,
          name: movie_name,
          tag_ids: tag_ids ? tag_ids : [],
          alt_group: alt_group ? alt_group : [],
          id: movie_id,
        })
      ),
    }),
};

export default { ...moviesUtilityDefs, ...moviesUtilityFuncs };
