import user from './user';
import categories from './categories';
import tags from './tags';
import movies from './movies';
import groups from './groups';

export { default as user } from './user';
export { default as groups } from './groups';
export { default as categories } from './categories';
export { default as movies } from './movies';
export { default as tags } from './tags';

export default {
  categories,
  groups,
  tags,
  user,
  movies,
};
