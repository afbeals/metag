/**
 * @name queryHandler
 * @description normalized function for interacting with db
 * @param {Pool} pool Postgres pool
 * @param {String} query the query string to use
 * @param {Function} [handler] a function to handle data before returning it
 * @example
 * const queryHandler = (pool, 'SELECT * FROM table', data => [data]);
 */
export const queryHandler = (pool, query, handler = null) => {
  let queryText;
  let queryVals = null;
  if (typeof query === 'string') {
    queryText = query;
  } else {
    queryText = query.text;
    queryVals = query.values;
  }
  return pool
    .query(queryText, queryVals)
    .then(res =>
      handler && typeof handler === 'function' ? handler(res) : res
    )
    .catch(err => err);
};

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

export default {
  pageLimiter,
  queryHandler,
};
