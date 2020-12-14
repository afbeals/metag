// External

// Internal
import { queryHandler } from '../util';
import { selectMovieInfoQuery } from './util';

// Constants

// fetch movie by group
const getMoviesByGroup = (
  pool,
  { query: { groups = null, prevId, orderBy, limit, dir } }
) => {
  if (!groups || groups.length < 1)
    return Promise.reject({ message: 'No groups specified' });
  const inGroup = groups.map((_, i) => `$${i + 1}`).join(', ');
  const related = `'{${groups.join(', ')}}'::int[] && mvg.related_groups_ids`;
  const whereIn = `grp.id IN (${inGroup})`;
  const where = `${related} OR ${whereIn}`;
  const group = `GROUP BY
  mv.name,
  mv.id,
  cat.id,
  grp.id,
  mvg.related_groups_ids`;
  const movieInGroupsQuery = selectMovieInfoQuery(
    {
      prevId,
      limit,
      orderBy,
      dir,
      where,
      group,
    },
    [...groups]
  );

  return queryHandler(pool, movieInGroupsQuery);
};

export default getMoviesByGroup;
