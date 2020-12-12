// External
import fs from 'fs-extra';
import path from 'path';

// Internal
import { queryHandler } from '../util';

// Constants
const {
  SERVER_CATEGORIES_TABLE: categoriesTable,
  SERVER_AD_PATH: adPath,
} = process.env;

// get available movies (by category)
const getAvailableMovies = async (pool, { query: { category } }) => {
  const catInfoQuery = {
    text: `SELECT * FROM ${categoriesTable} WHERE id = $1;`,
    values: [category],
  };
  const { rows: catInfoRows } = await queryHandler(pool, catInfoQuery);

  if (!catInfoRows || catInfoRows.length < 1)
    return Promise.reject({ message: "Category doesn't exist" });

  const { src_folder } = catInfoRows[0];
  const currentFiles = await new Promise((res, rej) => {
    const ad = path.resolve(adPath, src_folder);
    return fs.readdir(ad, (err, files) => {
      if (err) rej(err);
      res(files);
    });
  });

  const inGroup = currentFiles.map((_, i) => `$${i + 1}`).join(', ');

  const getPrevAddedQuery = {
    text: `SELECT * FROM movies WHERE file_src IN (${inGroup})`,
    values: currentFiles,
  };

  const { rows: prevAddRows = [] } = await queryHandler(
    pool,
    getPrevAddedQuery
  );
  return currentFiles.filter(
    cf => prevAddRows.findIndex(({ file_src }) => file_src === cf) === -1
  );
};

export default getAvailableMovies;
