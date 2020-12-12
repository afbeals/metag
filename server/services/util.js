// External
import fs from 'fs-extra';
import path from 'path';

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
 * @name rreaddir
 * @desc recursively search through directory get files/folders
 * @param {String} dir The directory to search
 * @param {Array} [allFiles] The list of files
 * @param {Array} [dirs] The list of directories
 * @example
 *
 * const [filesList, dirsList] = await rreaddir('my/dir'); // ['file.wmv']
 */
export const rreaddir = async (dir, allFiles = [], dirs = []) => {
  const files = (await fs.readdir(dir)).map(f => path.join(dir, f));
  await Promise.all(
    files.map(async f => (await fs.stat(f)).isDirectory() && dirs.push(f))
  );
  allFiles.push(...files);
  await Promise.all(
    files.map(
      async f => (await fs.stat(f)).isDirectory() && rreaddir(f, allFiles, dirs)
    )
  );
  return [allFiles, dirs];
};

export default {
  queryHandler,
  rreaddir,
};
