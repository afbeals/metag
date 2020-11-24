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
    text: `SELECT 'id' FROM public.${categoriesTable}
           WHERE name = $1;`,
    values: [category],
  };

  const foundDbCat = await queryHandler(pool, checkDbQuery);
  if (foundDbCat.length > 1) return Promise.reject('Category already exists');

  const catPath = path.join(adPath, category);
  return fs.ensureDir(catPath).then(() => {
    const normalizedCat = category.replace(' ', '_');
    const query = {
      text: `INSERT INTO public.(${categoriesTable})(name, src_folder)
            VALUES($1, $2)
            ON CONFLICT DO NOTHING
            RETURNING *;`,
      values: [category, normalizedCat],
    };
    return queryHandler(pool, query);
  });
};

// post update category (db and keep src same)
const updateCategory = (pool, { body: { category, id } }) => {
  if (!category || !id) return Promise.reject('missing required params');
  const query = {
    text: `UPDATE public.${categoriesTable}
          SET name = $1) WHERE id = $2 RETURNING *;`,
    values: [category, id],
  };
  return queryHandler(pool, query);
};

// delete delete category (if empty, folder/category)
const deleteCategory = async (pool, { body: { id, category } }) => {
  const getCatQuery = {
    text: `SELECT * FROM public.${categoriesTable}
            WHERE name = $1;`,
    values: [category],
  };
  const found = await queryHandler(pool, getCatQuery);
  const { src_folder } = found.rows[0];
  if (!src_folder) return Promise.reject('category not found');

  const catPath = path.join(adPath, src_folder);
  return fs.readdir(catPath, (err, files) => {
    if (err) return Promise.reject(`error deleting category for id ${id}`);
    if (!files.length) {
      const deleteCatQuery = {
        text: `DELETE FROM ${categoriesTable}
                WHERE id = $1
                AND src_folder = $2;`,
        values: [id, src_folder],
      };
      return queryHandler(pool, deleteCatQuery);
    }
  });
};

// get fetch db all categories (db categories);
const getAllCategories = pool => {
  const query = `SELECT * FROM public.${categoriesTable} ORDER BY id ASC;`;
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
