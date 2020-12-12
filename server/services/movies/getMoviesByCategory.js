// External

// Internal
import { queryHandler } from '../util';
import { selectMovieInfoQuery } from './util';

// Constants

// get fetch all movies under category (db);
const getMoviesByCategory = (
  pool,
  { query: { categories = null, prevId, limit, orderBy, dir } }
) => {
  if (!categories || categories.length < 1)
    return Promise.reject({ message: 'No category specified' });
  const inGroup = categories.map((_, i) => `$${i + 1}`).join(', ');
  const where = `cat.id IN (${inGroup})`;
  const group = `GROUP BY
  mv.name,
  mv.id,
  cat.id,
  grp.name,
  grp.src_folder,
  mvg.related_groups_ids`;
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

export default getMoviesByCategory;
