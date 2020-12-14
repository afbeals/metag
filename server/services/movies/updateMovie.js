// External
import fs from 'fs-extra';
import path from 'path';

// Internal
import { queryHandler } from '../util';

// Constants
const {
  SERVER_MOVIES_GROUPS_TABLE: moviesGroupsTable,
  SERVER_MOVIES_TAGS_TABLE: moviesTagsTable,
  SERVER_MOVIES_CATEGORY_TABLE: moviesCatTable,
  SERVER_CATEGORIES_TABLE: categoriesTable,
  SERVER_MOVIES_TABLE: moviesTable,
  SERVER_TAGS_TABLE: tagstable,
  SERVER_GROUPS_TABLE: groupsTable,
  SERVER_AD_GROUP: adGroup,
  SERVER_AD_PATH: adPath,
} = process.env;

// post update movie (change category (db/folder), add/remove tag(s)(db));
const updateMovie = async (
  pool,
  {
    body: {
      movie_id,
      name = null,
      category_id: new_cat_id = null,
      group_id: new_group_id = null,
      tags = [],
      notes = null,
    },
  }
) => {
  // fetch movie to make sure exists and get info
  const { rows: movieRows } = await queryHandler(pool, {
    text: `SELECT * FROM ${moviesTable} WHERE id = $1`,
    values: [movie_id],
  });
  if (movieRows.length < 1)
    return Promise.reject({
      message: `couldn't find movie for id ${movie_id}`,
    });
  const movie = movieRows[0];

  // update name
  if (name || notes) {
    const setQuery = Object.entries({ name: 'null', notes: null })
      .filter(([_, v]) => v)
      .map(([key], i) => `${key} = $${i + 1}`)
      .join(', ');
    const updateMovieName = {
      text: `UPDATE ${moviesTable}
             SET ${setQuery}
             WHERE id = $1;`,
      values: [movie_id].contact([name], [notes]),
    };
    await queryHandler(pool, updateMovieName);
  }

  // if category,
  if (new_cat_id && !new_group_id) {
    // get the category matching the old and new
    const oldMovieCatSrc = {
      text: `
    SELECT
      cat.src_folder AS category,
      cat.id
    FROM ${categoriesTable} as cat
    	LEFT JOIN ${moviesCatTable} as mvc
    		ON mvc.categories_id = cat.id
    WHERE mvc.movies_id = $1
      OR cat.id = $2;
    `,
      values: [movie_id, new_cat_id],
    };
    const { rows } = await queryHandler(pool, oldMovieCatSrc);
    let old_category_src, new_category_src;
    // grab old and new category src
    rows.forEach(({ id, category }) =>
      id === new_cat_id
        ? (new_category_src = category)
        : (old_category_src = category)
    );
    // set paths for current src and destination of file
    const addDefault = f_name =>
      f_name.includes('.') ? f_name : `${f_name}.mp4`;
    const movieSrc = path.join(
      adPath,
      old_category_src,
      addDefault(movie.file_src)
    );
    const movieDst = path.join(
      adPath,
      new_category_src,
      addDefault(movie.file_src)
    );
    const updateMovieCat = {
      text: `
    UPDATE ${moviesCatTable}
    SET categories_id = $1
    WHERE movies_id = $2;
    `,
      values: [new_cat_id, movie_id],
    };

    // update the join table and then move the file
    await queryHandler(pool, updateMovieCat)
      .then(() => fs.move(movieSrc, movieDst))
      .catch(err => err);
  }

  // If group update
  if (new_group_id) {
    // get the group for the old and new
    const oldMoveGroupSrc = {
      text: `
      SELECT
        group.src_folder AS group_src,
        group.id
      FROM ${groupsTable}
      	LEFT JOIN ${moviesGroupsTable}
      		ON ${moviesGroupsTable}.categories_id = ${groupsTable}.id
      WHERE ${moviesGroupsTable}.movies_id = $1
        OR ${groupsTable}.id = $2;`,
      values: [movie_id, new_group_id],
    };

    const { rows } = await queryHandler(pool, oldMoveGroupSrc);
    let old_group_src, new_group_src;

    // grab old and new category src
    rows.forEach(({ id, category }) =>
      id === new_group_src
        ? (new_group_src = category)
        : (old_group_src = category)
    );
    // set paths for current src and destination of file
    const addDefault = f_name =>
      f_name.includes('.') ? f_name : `${f_name}.mp4`;

    const movieSrc = path.join(
      adGroup,
      old_group_src,
      addDefault(movie.file_src)
    );
    const movieDst = path.join(
      adGroup,
      new_group_src,
      addDefault(movie.file_src)
    );
    const updateMovieGroup = {
      text: `
        UPDATE ${moviesGroupsTable}
        SET groups_id = $1
        WHERE movies_id = $2;
    `,
      values: [new_group_src, movie_id],
    };

    let catUpdateQuery = null;
    if (new_cat_id) {
      catUpdateQuery = {
        text: `
          UPDATE ${moviesCatTable}
          SET categories_id = $1
          WHERE movies_id = $2;
       `,
        values: [new_cat_id, movie_id],
      };
    }

    // update the join table and then move the file
    await queryHandler(pool, updateMovieGroup)
      .then(() => fs.move(movieSrc, movieDst))
      .then(() => (catUpdateQuery ? queryHandler(pool, catUpdateQuery) : null))
      .catch(err => err);
  }

  // sync update tags
  if (tags.length > 0) {
    const tagsUpdate = tags.map(tag => {
      const updateTag = {
        text: `INSERT INTO ${moviesTagsTable}(movies_id, tags_id)
                VALUES($1, $2)
                ON CONFLICT (movies_id, tags_id) DO NOTHING;`,
        values: [movie_id, tag],
      };
      return queryHandler(pool, updateTag);
    });
    await Promise.all(tagsUpdate).catch(err => err);
  }

  return queryHandler(pool, {
    text: `SELECT
    mv.img_src as img_src,
    mv.name as movie_name,
    mv.notes as notes,
    grp.name as group_name,
    grp.src_folder as group_src,
    mvg.related_groups_ids as alt_group,
    string_agg(
      distinct tg.id::varchar(255),
      ',' order by tg.id::varchar(255)
    ) as tag_ids,
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
    WHERE mv.id = $1
    GROUP BY
      mv.name,
      mv.id,
      cat.id,
      grp.id,
      mvg.related_groups_ids`,
    values: [movie_id],
  });
};

export default updateMovie;
