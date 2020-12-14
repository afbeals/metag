// External

// Internal
import { queryHandler } from '../util';
import { selectMovieInfoQuery } from './util';

// Constants

const getMovies = (pool, { query: { prevId, limit, orderBy, dir } }) => {
  const group = `GROUP BY
  mv.name,
  mv.id,
  cat.id,
  grp.id,
  mvg.related_groups_ids`;
  const getMoviesQuery = selectMovieInfoQuery({
    prevId,
    limit,
    orderBy,
    dir,
    group,
  });
  return queryHandler(pool, getMoviesQuery);
};

export default getMovies;
