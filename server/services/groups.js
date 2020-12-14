// External
import fs from 'fs-extra';
import path from 'path';

// Internal
import { queryHandler, rreaddir } from './util';

// Constants
const {
  SERVER_GROUPS_TABLE: groupsTable,
  SERVER_MOVIES_GROUPS_TABLE: moviesGroupsTable,
  SERVER_AD_GROUP: adGroup,
} = process.env;

// Queries
// post add group (db only)
const addGroup = async (pool, { body: { name, src_folder } }) => {
  // adjust src folder spaces
  let srcFolder = src_folder;
  if (srcFolder.includes(' ')) {
    const re = new RegExp(/\s/, 'g');
    const replacedSrc = srcFolder.replace(re, '_');
    const oldPath = path.join(adGroup, srcFolder);
    const newPath = path.join(adGroup, replacedSrc);
    await fs.rename(oldPath, newPath);
    srcFolder = replacedSrc;
  }

  const adGroupQuery = {
    text: `INSERT INTO ${groupsTable}(name, src_folder)
    VALUES($1, $2)
    RETURNING *;`,
    values: [name, srcFolder],
  };

  return queryHandler(pool, adGroupQuery);
};
// post create group (db and folder)
const createGroup = async (pool, { body: { group } }) => {
  const checkDbQuery = {
    text: `SELECT id FROM ${groupsTable}
           WHERE name = $1;`,
    values: [group],
  };

  const foundDbGrp = await queryHandler(pool, checkDbQuery);
  if (foundDbGrp.rows.length > 0)
    return Promise.reject({ message: 'Category already exists' });

  const groupPathReplaced = group.replace(/\s/g, '_');

  const groupPath = path.join(adGroup, groupPathReplaced);
  return fs
    .ensureDir(groupPath)
    .then(() => {
      const query = {
        text: `INSERT INTO ${groupsTable}(name, src_folder)
            VALUES($1, $2)
            RETURNING *;`,
        values: [group, groupPathReplaced],
      };
      return queryHandler(pool, query);
    })
    .catch(err => err);
};

// post update group (db and keep src same)
const updateGroup = (pool, { body: { group, id } }) => {
  if (!group || !id)
    return Promise.reject({ message: 'missing required params' });
  const query = {
    text: `UPDATE ${groupsTable}
          SET name = $1 WHERE id = $2 RETURNING *;`,
    values: [group, id],
  };
  return queryHandler(pool, query);
};

// delete delete group (if empty, folder/group)
const deleteGroup = async (pool, { body: { id } }) => {
  const getGrpQuery = {
    text: `SELECT * FROM ${groupsTable}
            WHERE id = $1;`,
    values: [id],
  };
  const found = await queryHandler(pool, getGrpQuery);
  if (found.rows.length < 1)
    return Promise.reject({ message: 'group not found' });

  const { src_folder, name } = found.rows[0];
  const grpPath = path.join(adGroup, src_folder);

  const [filesList, dirsList] = await rreaddir(grpPath);

  const hasFiles = filesList.filter(f => !dirsList.includes(f)).length > 0;

  if (hasFiles) {
    return Promise.reject({
      message: `directory not empty. Remove files from ${name}(id:${id})`,
    });
  }

  const deleteGrpQuery = {
    text: `DELETE FROM ${groupsTable}
        WHERE id = $1
        AND src_folder = $2;`,
    values: [id, src_folder],
  };
  return queryHandler(pool, deleteGrpQuery).then(() => fs.remove(grpPath));
};

// get fetch db all groups (db groups);
const getAllGroups = pool => {
  const query = `SELECT *,
  (SELECT count(*)::int AS amount
    FROM ${moviesGroupsTable}
  WHERE groups_id = ${groupsTable}.id )
  FROM ${groupsTable} ORDER BY id ASC;`;
  return queryHandler(pool, query);
};

// get fetch source all available groups (folders, no files)
const getAvailableGroups = async pool => {
  const getGrpQuery = {
    text: `SELECT * FROM ${groupsTable};`,
    values: [],
  };
  const { rows: groupQueryRows = [] } = await queryHandler(pool, getGrpQuery);

  const dirList = await new Promise((res, rej) =>
    fs.readdir(adGroup, (err, files) => {
      if (err) rej(err);
      res(files);
    })
  );

  const availableGroups = dirList
    .filter(
      dir =>
        groupQueryRows.findIndex(({ src_folder }) => dir === src_folder) === -1
    )
    .filter(f => f.toLowerCase() !== 'backup');

  return availableGroups;
};

export default {
  addGroup,
  createGroup,
  deleteGroup,
  getAllGroups,
  getAvailableGroups,
  updateGroup,
};
