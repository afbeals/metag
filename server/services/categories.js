// External
import fs from 'fs-extra';
import path from 'path';

// Internal
import { queryHandler } from './util';

// Constants
const {
  SERVER_CATEGORIES_TABLE: categoriesTable,
  SERVER_AD_PATH: adPath,
} = process.env;

// Queries
// post create category (db and folder)
const createCategory = async (pool, { body: { category } }) => {
  const checkDbQuery = {
    text: `SELECT id FROM ${categoriesTable}
           WHERE name = $1;`,
    values: [category],
  };

  const foundDbCat = await queryHandler(pool, checkDbQuery);
  if (foundDbCat.rows.length > 0)
    return Promise.reject({ message: 'Category already exists' });

  const catPath = path.join(adPath, category);
  return fs
    .ensureDir(catPath)
    .then(() => {
      const normalizedCat = category.replace(' ', '_');
      const query = {
        text: `INSERT INTO ${categoriesTable}(name, src_folder)
            VALUES($1, $2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;`,
        values: [category, normalizedCat],
      };
      return queryHandler(pool, query);
    })
    .catch(err => err);
};

// post update category (db and keep src same)
const updateCategory = (pool, { body: { category, id } }) => {
  if (!category || !id)
    return Promise.reject({ message: 'missing required params' });
  const query = {
    text: `UPDATE ${categoriesTable}
          SET name = $1 WHERE id = $2 RETURNING *;`,
    values: [category, id],
  };
  return queryHandler(pool, query);
};

// delete delete category (if empty, folder/category)
const deleteCategory = async (pool, { body: { id } }) => {
  const getCatQuery = {
    text: `SELECT * FROM ${categoriesTable}
            WHERE id = $1;`,
    values: [id],
  };
  const found = await queryHandler(pool, getCatQuery);
  if (found.rows.length < 1)
    return Promise.reject({ message: 'category not found' });

  const { src_folder, name } = found.rows[0];
  const catPath = path.join(adPath, src_folder);

  return new Promise((res, rej) =>
    fs
      .readdir(catPath)
      .then(files => {
        if (files.length > 0) {
          rej({
            message: `category not empty, move movies from ${name}(id:${id})`,
          });
        } else if (files.length === 0) {
          const deleteCatQuery = {
            text: `DELETE FROM ${categoriesTable}
                WHERE id = $1
                AND src_folder = $2;`,
            values: [id, src_folder],
          };
          queryHandler(pool, deleteCatQuery).then(() => {
            fs.remove(catPath).then(() => res());
          });
        }
      })
      .catch(err => err)
  );
};

// get fetch db all categories (db categories);
const getAllCategories = pool => {
  const query = `SELECT * FROM ${categoriesTable} ORDER BY id ASC;`;
  return queryHandler(pool, query);
};

// get fetch source all available categories (folders, no files)
const getAvailableCategories = () =>
  new Promise((res, rej) => {
    const ad = path.resolve(adPath);
    return fs.readdir(ad, (err, files) => {
      if (err) rej(err);
      res(files);
    });
  });

export default {
  createCategory,
  deleteCategory,
  getAllCategories,
  getAvailableCategories,
  updateCategory,
};
