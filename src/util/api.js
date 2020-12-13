// Internal
import { user, tags, categories, movies, groups } from './api/';

// Constants
const api = {
  user: {
    login: user.login,
  },
  tags: {
    fetch: tags.fetchAll,
    create: tags.create,
    delete: tags.delete,
    update: tags.update,
  },
  cat: {
    fetchAll: categories.fetchAll,
    fetchAvail: categories.fetchAvail,
    create: categories.create,
    delete: categories.delete,
    update: categories.update,
  },
  group: {
    create: groups.create,
    update: groups.update,
    delete: groups.delete,
    get_all: groups.getAll,
    get_avail: groups.getAvail,
  },
  movie: {
    avail: movies.getAvailable,
    all: movies.getMovies,
    underCat: movies.getMoviesUnderCat,
    underTag: movies.getMoviesUnderTag,
    img: movies.getMovieImg,
    search: movies.searchMovies,
    stream: movies.streamMovie,
    add: movies.add,
    delete: movies.delete,
    update: movies.update,
  },
};

export default api;
