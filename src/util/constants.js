// Internal
const { REACT_APP_SERVER_PORT, REACT_APP_SERVER_HOST } = process.env;
const localServer = `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`;

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
      ADD: `/addCategory`,
      FETCH_ALL: `/getAllCategories`,
      FETCH_AVAIL: `/getAvailableCategories`,
      UPDATE: `/updateCategory`,
    },
    GROUPS: {
      ADD: `/addGroup`,
      CREATE: `/createGroup`,
      UPDATE: `/updateGroup`,
      DELETE: `/deleteGroup`,
      GET: {
        ALL_GROUPS: `/getAllGroups`,
        AVAIL_GROUPS: `/getAvailableGroups`,
      },
    },
    MOVIES: {
      ADD: `/addMovieToDB`,
      DELETE: `/deleteMovie`,
      GET: {
        ALL: `/getMovies`,
        AVAIL: `/getAvailableMovies`,
        GROUP_AVAIL: `/getAvailableGroupMovies`,
        CATEGORY: `/getMoviesByCategory`,
        TAG: `/getMoviesByTags`,
        GROUP: `/getMoviesByGroup`,
        IMG: `/getMovieImg`,
      },
      STREAM: `/streamMovie`,
      SEARCH: `/searchMovies`,
      UPDATE: `/updateMovie`,
    },
  },
};

export default constants;
