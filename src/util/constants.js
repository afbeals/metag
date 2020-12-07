// Internal
const { REACT_APP_SERVER_PORT } = process.env;
const localServer = `http://localhost:${REACT_APP_SERVER_PORT}`;

const constants = {
  API: {
    ROOT: localServer,
    USER: {
      LOGIN: `/getUser`,
      UPDATE: `/updateUser`,
      CREATE: `/createUser`,
      GET_ALL: `/getAllUsers`,
      DELETE: `/deleteUser`,
    },
    TAGS: {
      CREATE: `/createTag`,
      DELETE: `/deleteTag`,
      FETCH_ALL: `/getAllTags`,
      UPDATE: `/updateTag`,
    },
    CATEGORIES: {
      CREATE: `/createCategory`,
      DELETE: `/deleteCategory`,
      FETCH_ALL: `/getAllCategories`,
      FETCH_AVAIL: `/getAvailableCategories`,
      UPDATE: `/updateCategory`,
    },
    MOVIES: {
      ADD: `/addMovieToDB`,
      DELETE: `/deleteMovie`,
      GET: {
        ALL: `/getMovies`,
        AVAIL: `/getAvailableMovies`,
        CATEGORY: `/getMoviesByCategory`,
        TAG: `/getMoviesByTags`,
        IMG: `/getMovieImg`,
      },
      STREAM: `/streamMovie`,
      SEARCH: `/searchMovies`,
      UPDATE: `/updateMovie`,
    },
  },
};

export default constants;
