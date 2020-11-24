// External

// Internal
import { queryHandler } from './util';

// Constants
const {
  SERVER_TAGS_TABLE: tagsTable,
  SERVER_MOVIES_TAGS_TABLE: movieTagsTable,
} = process.env;

// Queries
const createTag = (pool, { body: { tag } }) => {
  const query = {
    text: `INSERT INTO public.tags(${tagsTable})(name)
           VALUES($1)
           ON CONFLICT DO NOTHING
           RETURNING *;`,
    values: [tag],
  };
  return queryHandler(pool, query);
};

const updateTag = (pool, { body: { tag, id } }) => {
  if (!tag || !id) return Promise.reject('missing paramters to update tag');
  const query = {
    text: `UPDATE ${tagsTable}
          SET name = $1
          WHERE id = $2
          RETURNING *;`,
    values: [tag, id],
  };
  return queryHandler(pool, query);
};

const deleteTag = (pool, { body: { id } }) => {
  const query = {
    text: `DELETE FROM ${tagsTable} WHERE id = $1;`,
    values: [id],
  };
  return queryHandler(pool, query);
};

const getAllTags = pool => {
  const query = `SELECT *,
  (SELECT count(*) AS amount
    FROM ${movieTagsTable}
    WHERE tags_id = ${tagsTable}.id )
   FROM ${tagsTable}
   ORDER BY id ASC;`;
  return queryHandler(pool, query);
};

export default {
  createTag,
  deleteTag,
  getAllTags,
  updateTag,
};
