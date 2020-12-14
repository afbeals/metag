// External

// Internal
import { queryHandler } from '../util';
import { selectMovieInfoQuery } from './util';

// Constants

// fetch db movies under tag(s) (db);
const getMoviesByTags = (
  pool,
  { query: { tags = null, prevId, orderBy, limit, dir } }
) => {
  if (!tags || tags.length < 1)
    return Promise.reject({ message: 'No tags specified' });
  const inGroup = tags.map((_, i) => `$${i + 1}`).join(', ');
  const where = `tg.id IN (${inGroup})`;
  const group = `GROUP BY
  mv.name,
  mv.id,
  cat.id,
  grp.id,
  mvg.related_groups_ids`;
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

export default getMoviesByTags;
