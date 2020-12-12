// External
import fs from 'fs-extra';
import path from 'path';

// Internal
import { queryHandler } from '../util';

// Constants
const {
  SERVER_MOVIES_GROUPS_TABLE: moviesGroupsTable,
  SERVER_MOVIES_CATEGORY_TABLE: moviesCatTable,
  SERVER_CATEGORIES_TABLE: categoriesTable,
  SERVER_MOVIES_TABLE: moviesTable,
  SERVER_GROUPS_TABLE: groupsTable,
  SERVER_AD_GROUP: adGroup,
  SERVER_AD_PATH: adPath,
  SERVER_AD_THUMB: adThumb,
} = process.env;

// delete delete movie (db, folder);
const deleteMovie = async (pool, { body: { id } }) => {
  // get all movie info needed to remove folder and db info
  const getMovieInfoQuery = {
    text: `
  SELECT
    mv.file_src AS file_src,
    mv.img_src AS img_src,
    cg.src_folder AS categories_src,
    grp.src_folder AS groups_src
  FROM ${moviesCatTable} AS m_c
    LEFT JOIN
      ${moviesTable} AS mv
    ON mv.id = m_c.movies_id
    LEFT JOIN
      ${categoriesTable} AS cg
    ON cg.id = m_c.categories_id
    LEFT join ${moviesGroupsTable} as mvgrp
  	ON mvgrp.movies_id = m_c.movies_id
  	LEFT JOIN ${groupsTable} as grp
  	ON grp.id = mvgrp.groups_id
  WHERE mv.id = $1`,
    values: [id],
  };
  const movie_info = await queryHandler(pool, getMovieInfoQuery);
  if (!movie_info) return Promise.reject({ message: 'Movie not found' });
  const { rows } = movie_info;

  if (!rows || rows.length < 1)
    return Promise.reject({ message: "Movie doesn't exist" });
  const {
    file_src = null,
    img_src = null,
    categories_src = null,
    groups_src = null,
  } = rows[0];
  // if no info, then don't try to do anything else
  if (!file_src || (!categories_src && !groups_src))
    return Promise.reject({ message: 'Movie info corrupted' });

  // remove movie first
  const moviePath = groups_src
    ? path.join(adGroup, groups_src, file_src)
    : path.join(adPath, categories_src, file_src);
  return fs
    .remove(moviePath)
    .then(() => {
      if (img_src) {
        // has img, try to remove thumb dir
        const imgDir = path.join(adThumb, `${img_src}`);
        return fs.remove(imgDir);
      }
      return;
    })
    .then(() => {
      const deleteMovieQuery = {
        text: `DELETE FROM ${moviesTable} WHERE id = $1;`,
        values: [id],
      };
      return queryHandler(pool, deleteMovieQuery);
    })
    .catch(err => err);
};

export default deleteMovie;
