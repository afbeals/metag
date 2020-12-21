// External

// Internal
const {
  SERVER_MOVIES_GROUPS_TABLE: moviesGroupsTable,
  SERVER_MOVIES_TAGS_TABLE: moviesTagsTable,
  SERVER_MOVIES_CATEGORY_TABLE: moviesCatTable,
  SERVER_CATEGORIES_TABLE: categoriesTable,
  SERVER_MOVIES_TABLE: moviesTable,
  SERVER_TAGS_TABLE: tagstable,
  SERVER_GROUPS_TABLE: groupsTable,
} = process.env;

/**
 * @function pageLimiter
 * @desc add pagination limiter to query
 * @param {Object} param
 * @param {Object} param.dir
 * @param {Object} param.where
 * @param {Object} param.group
 * @param {number} currentValLength
 * @example
 * const `SELECT * FROM table ${pageLimiter(options)}`;
 */
export const pageLimiter = ({ dir, where, group }, currentValLength) =>
  `WHERE $${currentValLength + 2} ${dir === 'ASC' ? '>' : '<'} $${
    currentValLength + 1
  }
  ${where ? `AND ${where}` : ''}
  ${group}
  ${
    dir === 'ASC'
      ? `ORDER BY $${currentValLength + 2} ASC LIMIT $${currentValLength + 3};`
      : `ORDER BY $${currentValLength + 2} DESC LIMIT $${currentValLength + 3};`
  }`;

export const selectMovieInfoQuery = (
  {
    prevId = 0,
    orderBy = 'mv.id',
    limit = 1500,
    dir = 'ASC',
    where = null,
    group = '',
  } = {},
  currentVals = []
) => ({
  text: `
    SELECT
      mv.img_src as img_src,
      mv.name as movie_name,
      mv.notes as notes,
      grp.id as group_id,
      mvg.related_groups_ids as alt_group,
      array_agg(
        distinct tg.id
      ) FILTER (WHERE tg.id IS NOT NULL) as tag_ids,
      cat.id as category_id,
      mv.id AS movie_id,
      mv.duration AS movie_duration
    FROM ${moviesTable} AS mv
      LEFT JOIN ${moviesTagsTable} AS mvt
          ON mv.id = mvt.movies_id
      LEFT JOIN ${tagstable} AS tg
          ON mvt.tags_id = tg.id
      LEFT JOIN ${moviesCatTable} AS mvc
          ON mv.id = mvc.movies_id
      LEFT JOIN ${categoriesTable} AS cat
          ON mvc.categories_id = cat.id
      LEFT JOIN ${moviesGroupsTable} AS mvg
          ON mv.id = mvg.movies_id
      LEFT JOIN ${groupsTable} AS grp
          ON mvg.groups_id = grp.id
      ${pageLimiter({ dir, where, group }, currentVals.length)}`,
  values: [...currentVals, prevId, orderBy, limit],
});

export default {
  selectMovieInfoQuery,
  pageLimiter,
};
