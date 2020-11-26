import user from './user';
import movies from './movies';
import categories from './categories';
import tags from './tags';

export { default as user } from './user';
export { default as categories } from './categories';
export { default as movies } from './movies';
export { default as tags } from './tags';

export default {
  categories,
  user,
  movies,
  tags,
};
