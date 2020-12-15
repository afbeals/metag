// External
import path from 'path';

// Internal
import { queryHandler, rreaddir } from '../util';

// Constants
const {
  SERVER_GROUPS_TABLE: groupsTable,
  SERVER_AD_GROUP: adGroup,
} = process.env;

// get available movies (by group)
const getAvailableGroupMovies = async (pool, { query: { group_id } }) => {
  const groupInfoQuery = {
    text: `SELECT * FROM ${groupsTable} WHERE id = $1;`,
    values: [group_id],
  };
  const { rows: groupRows } = await queryHandler(pool, groupInfoQuery);

  if (!groupRows || groupRows.length < 1)
    return Promise.reject({ message: "Group doesn't exist" });

  const { src_folder } = groupRows[0];
  const ad = path.resolve(adGroup, src_folder);

  const [filesList, dirsList] = await rreaddir(ad);

  const re = `(.*${src_folder}\\\\)`;
  const regex = new RegExp(re, 'g');

  const replaceDir = dirsList.map(f => f.replace(regex, ''));
  const replaceFile = filesList
    .map(f => f.replace(regex, ''))
    .filter(
      v =>
        v.includes('.mp4') ||
        v.includes('.mov') ||
        v.includes('.wmv') ||
        v.includes('.lnk')
    );

  const adjustedList = replaceFile.map(f =>
    f.replace(new RegExp('\\\\', 'g'), '/')
  );
  const adjustedDirs = replaceDir.map(f =>
    f.replace(new RegExp('\\\\', 'g'), '/')
  );

  const inGroup = adjustedList.map((_, i) => `$${i + 1}`).join(', ');

  const getPrevAddedQuery = {
    text: `SELECT * FROM movies WHERE file_src IN (${inGroup})`,
    values: adjustedList,
  };

  const { rows: prevAddRows = [] } = await queryHandler(
    pool,
    getPrevAddedQuery
  );

  return {
    group: src_folder,
    dirsList: adjustedDirs,
    convertNeeded: adjustedList
      .filter(f => f.includes('.wmv'))
      .filter(
        cf => prevAddRows.findIndex(({ file_src }) => file_src === cf) === -1
      ),
    filesList: adjustedList
      .filter(f => !f.includes('.wmv'))
      .filter(
        cf => prevAddRows.findIndex(({ file_src }) => file_src === cf) === -1
      ),
  };
};

export default getAvailableGroupMovies;
