// Internal
import { queryHandler } from './util';

// Constants
const usersTable = process.env.SERVER_USERS_TABLE;

// Queries

const getAllUsers = pool =>
  queryHandler(pool, `SELECT * FROM ${usersTable} ORDER BY id ASC`);

const getUser = async (pool, { query: { username: value } }) => {
  const query = {
    text: `SELECT * FROM users WHERE username = $1;`,
    values: [value],
  };
  const { rows } = await queryHandler(pool, query);

  if (!rows || rows.length < 1)
    return Promise.reject({ message: 'no user found' });
  return { ...rows[0] };
};

const createUser = async (
  pool,
  { body: { username, first_name, last_name } }
) => {
  const query = {
    text: `
      INSERT INTO ${usersTable}(username, first_name, last_name)
      VALUES($1,$2,$3)
      RETURNING *;`,
    values: [username, first_name, last_name],
  };
  return await queryHandler(pool, query);
};

const deleteUser = async (pool, { body: { id } }) => {
  const query = {
    text: `DELETE FROM ${usersTable} WHERE id = $1;`,
    values: [id],
  };
  return await queryHandler(pool, query);
};

const updateUser = async (pool, { body }) => {
  const { id, ...restBody } = body;
  const updates = Object.entries(restBody);

  if (!id) return Promise.reject({ message: 'Missing user Id' });
  if (updates.length < 1)
    return Promise.reject({ message: 'Nothing requested to update' });

  const text = [`UPDATE ${usersTable} SET`];
  const values = [];
  updates.forEach(([key, val], i) => {
    text.push(`${key} = $${i + 1}`);
    values.push(val);
  });
  text.push(`WHERE id = ${id} RETURNING *;`);

  const query = {
    text: text.join(' '),
    values,
  };
  const results = await queryHandler(pool, query);
  return results;
};

export default {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
