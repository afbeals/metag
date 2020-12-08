// External
import fs from 'fs-extra';
import path from 'path';
import fsD from 'fs';
import ffprobe from 'ffprobe';
import ffprobeS from 'ffprobe-static';
import { exec } from 'child_process';

// Internal
import { queryHandler, pageLimiter } from './util';

// Constants
const {
  SERVER_MOVIES_TAGS_TABLE: moviesTagsTable,
  SERVER_MOVIES_CATEGORY_TABLE: moviesCatTable,
  SERVER_CATEGORIES_TABLE: categoriesTable,
  SERVER_MOVIES_TABLE: moviesTable,
  SERVER_TAGS_TABLE: tagstable,
  SERVER_AD_PATH: adPath,
  SERVER_AD_THUMB: adThumb,
} = process.env;
const selectMovieInfoQuery = (
  {
    prevId = 0,
    orderBy = 'mv.id',
    limit = 15,
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
      ${pageLimiter({ dir, where, group }, currentVals.length)}`,
  values: [...currentVals, prevId, orderBy, limit],
});

// get query pagination sequence movie (db);
const getMovies = (pool, { query: { prevId, limit, orderBy, dir } }) => {
  const group = `GROUP BY mv.name, mv.id, cat.id`;
  const getMoviesQuery = selectMovieInfoQuery({
    prevId,
    limit,
    orderBy,
    dir,
    group,
  });
  return queryHandler(pool, getMoviesQuery);
};

// get fetch all movies under category (db);
const getMoviesByCategory = (
  pool,
  { query: { categories, prevId, limit, orderBy, dir } }
) => {
  if (!categories || categories.length < 1)
    return Promise.reject({ message: 'No category specified' });
  const inGroup = categories.map((_, i) => `$${i + 1}`).join(', ');
  const where = `cat.id IN (${inGroup})`;
  const group = 'GROUP BY mv.name, mv.id, cat.id';
  const movieUnderCatQuery = selectMovieInfoQuery(
    {
      prevId,
      limit,
      orderBy,
      dir,
      where,
      group,
    },
    [...categories]
  );
  return queryHandler(pool, movieUnderCatQuery);
};

// fetch db movies under tag(s) (db);
const getMoviesByTags = (
  pool,
  { query: { tags, prevId, orderBy, limit, dir } }
) => {
  if (!tags || tags.length < 1)
    return Promise.reject({ message: 'No tags specified' });
  const inGroup = tags.map((_, i) => `$${i + 1}`).join(', ');
  const where = `tg.id IN (${inGroup})`;
  const group = `GROUP BY mv.name, mv.id, cat.id`;
  const movieWithTagsQuery = selectMovieInfoQuery(
    {
      prevId,
      limit,
      orderBy,
      dir,
      where,
      group,
    },
    [...tags]
  );

  return queryHandler(pool, movieWithTagsQuery);
};

// post update movie (change category (db/folder), add/remove tag(s)(db));
const updateMovie = async (
  pool,
  { body: { movie_id, name = null, category_id: new_cat_id = null, tags = [] } }
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
  if (name) {
    const updateMovieName = {
      text: `UPDATE ${moviesTable}
             SET name = $1
             WHERE id = $2;`,
      values: [name, movie_id],
    };
    await queryHandler(pool, updateMovieName);
  }

  // if category,
  if (new_cat_id) {
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
    WHERE mv.id = $1
    GROUP BY mv.name, mv.id, cat.id`,
    values: [movie_id],
  });
};

// get search for movie by name(db)
const searchMovies = async (
  pool,
  { query: { name = '', tags: tg = [], category: cat = [], prevId } }
) => {
  const fillGroupOf = (l, start = 2) => {
    // start at 2 = start after 'name' in array
    let i = start;
    return [...new Array(l)].map(_ => `$${(i++).toString()}`).join(', ');
  };

  const whereParts = Object.entries({
    cat: fillGroupOf(cat.length),
    tg: fillGroupOf(tg.length, cat.length + 2), // start at 2, 1 for position 1 for cat
  })
    .map(([key, val]) => (val.length > 0 ? `${key}.id IN (${val})` : ''))
    .filter(v => !!v);

  whereParts.push('mv.name LIKE $1');
  const where = whereParts.join(' AND ');

  const group = `GROUP BY mv.name, mv.id, cat.id`;
  const searchQuery = selectMovieInfoQuery(
    {
      prevId,
      where,
      group,
    },
    [`%${name}%`, ...cat, ...tg] // order is important
  );

  const { rows = [] } = await queryHandler(pool, searchQuery);
  if (rows.length < 1) {
    return { rows: [] };
  }
  return { rows };
};

// delete delete movie (db, folder);
const deleteMovie = async (pool, { body: { id } }) => {
  // get all movie info needed to remove folder and db info
  const getMovieInfoQuery = {
    text: `
  SELECT
    mv.file_src AS file_src,
    mv.img_src AS img_src,
    cg.src_folder AS categories_src
  FROM ${moviesCatTable} AS m_c
    INNER JOIN
      ${moviesTable} AS mv
    ON mv.id = m_c.movies_id
    INNER JOIN
      ${categoriesTable} AS cg
    ON cg.id = m_c.categories_id
  WHERE mv.id = $1`,
    values: [id],
  };
  const movie_info = await queryHandler(pool, getMovieInfoQuery);
  if (!movie_info) return Promise.reject({ message: 'Movie not found' });
  const { rows } = movie_info;

  if (!rows || rows.length < 1)
    return Promise.reject({ message: "Movie doesn't exist" });
  const { file_src = null, img_src = null, categories_src = null } = rows[0];
  // if no info, then don't try to do anything else
  if (!file_src || !categories_src)
    return Promise.reject({ message: 'Movie info corrupted' });

  // remove movie first
  const moviePath = path.join(adPath, categories_src, file_src);
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

// post create movie/thumb/gif (db)
const addMovieToDB = async (
  pool,
  { body: { tag_ids, category_id, file_src, name, notes } }
) => {
  // add movie and get row info
  const insertMovieQuery = {
    text: `INSERT INTO ${moviesTable}(file_src, name, notes)
      VALUES($1, $2, $3)
      RETURNING *;`,
    values: [file_src, name, notes],
  };
  const catInfoQuery = {
    text: `SELECT * FROM ${categoriesTable} WHERE id = $1;`,
    values: [category_id],
  };
  const { rows: movieRows } = await queryHandler(pool, insertMovieQuery);
  const { rows: catRows } = await queryHandler(pool, catInfoQuery);
  const { id: movie_id } = movieRows[0];
  const { src_folder: cat_src, id: cat_id } = catRows[0];
  let movie_duration = 0;

  // make sure dir exists
  const thumbDir = path.join(adThumb, `${movie_id}`);
  await fs.ensureDir(thumbDir);

  // create images
  const thumbPath = path.join(thumbDir, 'thumb.jpg');
  const createThumb = await new Promise((res, rej) =>
    fsD.access(thumbPath, fs.F_OK, err => {
      // if file doesn't exist
      if (err) {
        // get info from movie file
        const moviePath = `${adPath}/${cat_src}/${file_src}`;

        ffprobe(
          moviePath,
          { path: ffprobeS.path },
          (ffprobeErr, { streams: movieStats }) => {
            if (ffprobeErr) rej(ffprobeErr);

            // create thumbnail
            movie_duration = Math.round(movieStats[0].duration);
            const startTime = Math.round(movieStats[0].duration / 3).toFixed(2);

            const execScript = [
              'ffmpeg', // start process
              `-ss ${startTime}`, // set start time
              `-i "${moviePath}"`, // set input file
              '-vframes 1', // set amount of frames per sec
              '-vf "scale=w=480:h=-1"', // use filter scale the image
              `${thumbPath}`, // set the output name
            ];
            const ffmpegScript = execScript.join(' ');

            exec(ffmpegScript, execError => {
              if (execError) {
                rej(execError);
              }

              res();
            });
          }
        );
      } else {
        // Image already exists
        res();
      }
    })
  );

  // create Gif
  const gifPath = path.join(thumbDir, 'gif.gif');
  const createGif = await new Promise((res, rej) =>
    fsD.access(gifPath, fs.F_OK, err => {
      // if file doesn't exist
      if (err) {
        // get info from movie file
        const moviePath = `${adPath}/${cat_src}/${file_src}`;
        ffprobe(
          moviePath,
          { path: ffprobeS.path },
          (ffprobeErr, { streams: movieStats }) => {
            if (ffprobeErr) rej(ffprobeErr);

            // create gif starting halfway through
            const startTime = Math.round(movieStats[0].duration / 2).toFixed(2);

            const execScript = [
              'ffmpeg', // start process
              `-ss ${startTime}`, // set start time
              `-t 6`, // set the gif duration
              `-i "${moviePath}"`, // set input file
              // https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
              // eslint-disable-next-line max-len
              '-filter_complex "[0:v] fps=12,scale=480:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse"',
              `${gifPath}`, // set the output name
            ];
            exec(execScript.join(' '), execError => {
              if (execError) {
                rej(execError);
              }
              res();
            });
          }
        );
      } else {
        // Image already exists
        res();
      }
    })
  );

  // update img_src
  const updateMovieImgSrc = {
    text: `UPDATE ${moviesTable}
            SET img_src = $1,
                duration = $2
            WHERE id = $1`,
    values: [movie_id, `${movie_duration}`],
  };
  await queryHandler(pool, updateMovieImgSrc);

  // update cat/movie table ON CONFLICT DO NOTHING
  const addMovieCat = {
    text: `INSERT INTO ${moviesCatTable}(movies_id, categories_id)
            VALUES($1, $2)
            ON CONFLICT (movies_id, categories_id) DO NOTHING;`,
    values: [movie_id, cat_id],
  };
  await queryHandler(pool, addMovieCat);

  // update tags/movie table
  const addMovieTags = tag_ids.map(tag_id => {
    const addMovieTag = {
      text: `INSERT INTO ${moviesTagsTable}(movies_id, tags_id)
              VALUES($1, $2)
              ON CONFLICT (movies_id, tags_id) DO NOTHING;`,
      values: [movie_id, tag_id],
    };
    return queryHandler(pool, addMovieTag);
  });

  // wait for transactions
  return Promise.all([createThumb, createGif, ...addMovieTags]);
};

// stream movie (db);
const streamMovie = async (
  pool,
  {
    headers,
    query: { suggestedPath = null, suggestedCat = null, id: movie_id },
  }
) => {
  let moviePath;
  if (suggestedPath && suggestedCat) {
    const getCathPathQuery = {
      text: `SELECT src_folder FROM ${categoriesTable}
      WHERE id = $1;`,
      values: [suggestedCat],
    };
    const { rows } = await queryHandler(pool, getCathPathQuery);
    const { src_folder } = rows[0];
    moviePath = path.join(adPath, src_folder, suggestedPath);
  } else {
    const getMovieCatInfo = {
      text: `SELECT
                mv.file_src as file_src,
                cat.src_folder as cat_src
              FROM ${moviesTable} AS mv
              LEFT JOIN ${moviesCatTable} AS mvc
              ON mv.id = mvc.movies_id
              LEFT JOIN ${categoriesTable} AS cat
              ON mvc.categories_id = cat.id
              WHERE mv.id = $1`,
      values: [movie_id],
    };

    const { rows: movieCatRow } = await queryHandler(pool, getMovieCatInfo);
    const { cat_src, file_src } = movieCatRow[0];
    moviePath = path.join(adPath, cat_src, file_src);
  }
  return new Promise((res, rej) => {
    fsD.stat(moviePath, (err, stat) => {
      // Handle file not found
      if (err !== null && err.code === 'ENOENT') {
        rej(404);
      }

      // get file info
      const { size: fileSize } = stat;
      const { range } = headers;
      let file;
      let head;
      let status;

      // if range, stream video in chunks
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');

        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;

        file = fsD.createReadStream(moviePath, { start, end });
        head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        status = 206;
      } else {
        head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        status = 200;
        file = fsD.createReadStream(moviePath);
      }
      res({
        file,
        head,
        status,
      });
    });
  });
};

// get movie image
const getMovieImg = ({ query: { type = 'jpg', movie_id } }) => {
  if (!movie_id) {
    return Promise.reject({ message: 'missing movie id parameter' });
  }
  const img = type === 'jpg' ? 'thumb.jpg' : 'gif.gif';
  return Promise.resolve(path.join(adThumb, `${movie_id}`, `${img}`));
};

export default {
  addMovieToDB,
  deleteMovie,
  getAvailableMovies,
  getMovies,
  getMoviesByCategory,
  getMoviesByTags,
  getMovieImg,
  searchMovies,
  streamMovie,
  updateMovie,
};
