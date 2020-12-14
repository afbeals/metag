// External

// Internal
import { queryHandler } from '../util';
import { selectMovieInfoQuery } from './util';

// Constants

// get search for movie by name(db)
const searchMovies = async (
  pool,
  {
    query: {
      name = '',
      tags: tg = [],
      category: cat = [],
      groups: grp = [],
      prevId,
    },
  }
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

  const related = `'{${grp.join(', ')}}'::int[] && mvg.related_groups_ids`;
  const inGroup = grp.map((_, i) => `$${cat.length + 3 + i + 1}`).join(', ');
  const whereIn = `grp.id IN (${inGroup})`;
  const groupWhere = grp.length > 0 ? [`(${related} OR ${whereIn})`] : [];
  const where = whereParts.concat(groupWhere).join(' AND ');

  const group = `GROUP BY
  mv.name,
  mv.id,
  cat.id,
  grp.id,
  mvg.related_groups_ids`;
  const searchQuery = selectMovieInfoQuery(
    {
      prevId,
      where,
      group,
    },
    [`%${name}%`, ...cat, ...tg] // order is important
  );

  const { rows = [] } = await queryHandler(pool, searchQuery);
  return { rows };
};

export default searchMovies;
