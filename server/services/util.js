/**
 * @name queryHandler
 * @description normalized function for interacting with db
 * @param {Pool} pool Postgres pool
 * @param {String} query the query string to use
 * @param {Function} [handler] a function to handle data before returning it
 * @example
 * const queryHandler = (pool, 'SELECT * FROM table', data => [data]);
 */
const queryHandler = (pool, query, handler) =>
  new Promise((res, rej) =>
    pool.query(query, (err, results) => {
      if (err) {
        rej(err);
      }
      if (handler && typeof handler === 'function') {
        res(handler(results));
      }
      res(results);
    })
  );

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
const pageLimiter = (
  { dir = 'ASC', where = null, group = '' },
  currentValLength
) => `
  WHERE ($${currentValLength + 1}) ${
  dir === 'ASC' ? '>' : '<'
} ($${currentValLength})
  ${where ? `AND ${where}` : ''}
  ORDER BY $${currentValLength + 1} $${currentValLength + 3} LIMIT $${
  currentValLength + 2
}]
  ${group};`;

export default {
  pageLimiter,
  queryHandler,
};
