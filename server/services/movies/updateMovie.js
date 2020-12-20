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
      name: new_name,
      category_id: new_cat_id,
      group_id: new_group_id,
      related_group_ids: new_related,
      tags: new_tags = [],
      notes: new_notes,
    },
  }
) => {
  if (!movie_id) {
    return Promise.reject({ message: 'missing request movie id' });
  }

  // get all movie info to operate on
  const getCurrentMoveInfo = {
    text: `SELECT
    grp.id as group_id,
    grp.src_folder as group_src,
    cat.id as category_id,
    cat.src_folder as cat_src,
    mv.file_src as movie_src
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
  };

  // fetch movie to make sure exists and get info
  const { rows: movieRows } = await queryHandler(pool, getCurrentMoveInfo);
  if (movieRows.length < 1)
    return Promise.reject({
      message: `couldn't find movie for id ${movie_id}`,
    });
  const { group_id, category_id, group_src, cat_src, movie_src } = movieRows[0];

  const queryValues = {
    movie_id,
    new_name,
    new_cat_id,
    new_group_id,
    new_related,
    new_tags,
    new_notes,
  };

  // update name and notes
  const updateMovieNameNotesQuery = `
    UPDATE ${moviesTable}
      SET name = $new_name,
          notes = $new_notes
      WHERE id = $movie_id;`;

  // Delete category in table, then insert (incase it never existed)
  const deleteMovieCat = `
    DELETE FROM ${moviesCatTable}
      WHERE movies_id = $movie_id;`;

  const insertNewCat = `
    INSERT INTO ${moviesCatTable}(movies_id, categories_id)
      VALUES($movie_id, $new_cat_id);`;

  // Delete groups in table, then insert (incase it never existed)
  const deleteMovieGroups = `
    DELETE FROM ${moviesGroupsTable}
        WHERE movies_id = $movie_id;`;

  const insertMovieGroups = `
    INSERT INTO ${moviesGroupsTable}(movies_id, groups_id)
      VALUES($movie_id, $new_group_id);`;

  const updateRelatedGroups = `
    UPDATE ${moviesGroupsTable}
      SET related_groups_ids = '{${
        new_related && new_related.join(', ')
      }}'::int[]
      WHERE movies_id = $movie_id`;

  // delete tags before insert
  const deleteMovieTags = `
    DELETE FROM ${moviesTagsTable}
      WHERE movies_id = $movie_id;`;

  // create insert tags promise array
  const insertTagsArray = `
      INSERT INTO ${moviesTagsTable}(movies_id, tags_id)
         VALUES ($movie_id,${new_tags
           .map(v => `'${v}'::int`)
           .join('),($movie_id,')});
  `;

  // get info to move movie before updating db
  let originalSrc = null;
  let newSrc = null;

  // get original src
  if (group_id) {
    originalSrc = path.join(adGroup, group_src, movie_src);
  } else {
    originalSrc = path.join(adPath, cat_src, movie_src);
  }

  // if new group or new cat, move set destination
  if (new_group_id && group_id !== new_group_id) {
    const newGroupInfoQuery = {
      text: `SELECT * FROM ${groupsTable}
        WHERE id = $1;`,
      values: [new_group_id],
    };
    const { rows } = await queryHandler(pool, newGroupInfoQuery);
    if (!rows || rows.length < 1) {
      return Promise.reject({
        message: `New group not found for id ${new_group_id}`,
      });
    }
    newSrc = path.join(adGroup, rows[0].src_folder, movie_src);
  } else if (new_cat_id && new_cat_id !== category_id) {
    const newCatInfoQuery = {
      text: `SELECT * FROM ${categoriesTable}
        WHERE id = $1;`,
      values: [new_cat_id],
    };
    const { rows } = await queryHandler(pool, newCatInfoQuery);
    if (!rows || rows.length < 1) {
      return Promise.reject({
        message: `New category not found for id ${new_cat_id}`,
      });
    }
    newSrc = path.join(adPath, rows[0].src_folder, movie_src);
  }

  // promise array in order of events
  const updateRequestsArray = [
    queryHandler(pool, {
      text: updateMovieNameNotesQuery,
      values: queryValues,
    }),
    new_cat_id !== category_id
      ? queryHandler(pool, { text: deleteMovieCat, values: queryValues })
      : null,
    !!new_cat_id && new_cat_id !== category_id
      ? queryHandler(pool, { text: insertNewCat, values: queryValues })
      : null,
    new_group_id !== group_id
      ? queryHandler(pool, { text: deleteMovieGroups, values: queryValues })
      : null,
    !!new_group_id && new_group_id !== group_id
      ? queryHandler(pool, { text: insertMovieGroups, values: queryValues })
      : null,
    Array.isArray(new_related)
      ? queryHandler(pool, { text: updateRelatedGroups, values: queryValues })
      : null,
    queryHandler(pool, { text: deleteMovieTags, values: queryValues }),
    Array.isArray(new_tags) && new_tags.length > 0
      ? queryHandler(pool, { text: insertTagsArray, values: queryValues })
      : null,
  ].filter(v => v);

  // run in sequence, then move file after done
  await updateRequestsArray
    .reduce(
      (promiseChain, currentTask) =>
        promiseChain.then(chainResults =>
          currentTask.then(currentResult => [...chainResults, currentResult])
        ),
      Promise.resolve([])
    )
    .then(data => {
      // move movie to new location if necessary
      if (originalSrc && newSrc) {
        return fs.move(originalSrc, newSrc);
      }
      return data;
    });

  // return updated movie
  return queryHandler(pool, {
    text: `SELECT
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
