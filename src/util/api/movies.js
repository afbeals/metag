// External
import axios from './axiosConfig';

// Local
import constants from '../constants';

const moviesAPI = {
  /**
   * @desc api request to fetch available under category
   * @method getAvailable
   * @param {object} movieData
   * @param {string} movieData.category to check for movies
   * @return {object} return data from query
   */
  getAvailable: async movieData => {
    const response = await axios.get(constants.API.MOVIES.GET.AVAIL, {
      params: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to get movies
   * @method getMovies
   * @param {object} movieData
   * @param {Number} movieData.prevId the prev id of last query
   * @param {string} [movieData.limit='15'] the amount to fetch
   * @param {string} [movieData.orderBy='mv.id'] the field to order the query
   * @param {string} [movieData.dir='ASC'] the sort direction
   * @return {object} return data from query
   */
  getMovies: async movieData => {
    const response = await axios.get(constants.API.MOVIES.GET.AVAIL, {
      params: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to get movies under cat
   * @method getMoviesUnderCat
   * @param {object} movieData
   * @param {Number} movieData.prevId the prev id of last query
   * @param {Array} movieData.categories the categories to seach under
   * @param {string} [movieData.limit='15'] the amount to fetch
   * @param {string} [movieData.orderBy='mv.id'] the field to order the query
   * @param {string} [movieData.dir='ASC'] the sort direction
   * @return {object} return data from query
   */
  getMoviesUnderCat: async movieData => {
    const response = await axios.get(constants.API.MOVIES.GET.CATEGORY, {
      params: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to get movies under tag
   * @method getMoviesUnderTag
   * @param {object} movieData
   * @param {Number} movieData.prevId the prev id of last query
   * @param {Array} movieData.tags the tags to seach under
   * @param {string} [movieData.limit='15'] the amount to fetch
   * @param {string} [movieData.orderBy='mv.id'] the field to order the query
   * @param {string} [movieData.dir='ASC'] the sort direction
   * @return {object} return data from query
   */
  getMoviesUnderTag: async movieData => {
    const response = await axios.get(constants.API.MOVIES.GET.TAG, {
      params: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to get movie image
   * @method getMovieImg
   * @param {object} movieData
   * @param {String} [movieData.type='jpg'] the type of image
   * @param {Array} movieData.movie_id the id of the movie
   * @return {object} return data from query
   */
  getMovieImg: async movieData => {
    const response = await axios.get(constants.API.MOVIES.GET.IMG, {
      params: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to search data
   * @stream
   * @method searchMovies
   * @param {object} movieData
   * @param {String} movieData.prevId the prev last id of the query
   * @param {Array} movieData.category the list of category id to search
   * @param {Array} movieData.tags the list of tag ids to search
   * @param {String} movieData.name the name of the movie to search
   * @return {object} return data from query
   */
  searchMovies: async movieData => {
    const response = await axios.get(constants.API.MOVIES.SEARCH, {
      params: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to stream data
   * @stream
   * @method streamMovie
   * @param {object} movieData
   * @param {String} movieData.id the id of the movie
   * @return {object} return data from query
   */
  streamMovie: async movieData => {
    const response = await axios.get(constants.API.MOVIES.STREAM, {
      params: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to add movie to db
   * @method add
   * @param {object} movieData
   * @param {string} movieData.tag_ids the tag ids to add to movie
   * @param {string} movieData.category_id the category id to add
   * @param {string} movieData.file_name the associated file name of the movie
   * @param {string} movieData.name the db name for the movie
   * @return {object} return data from query
   */
  add: async movieData => {
    const response = await axios.post(constants.API.MOVIES.ADD, movieData);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to delete movie from dir and db
   * @method delete
   * @param {object} movieData
   * @param {string} movieData.id the id to delete
   * @return {object} return data from query
   */
  delete: async movieData => {
    const response = await axios.delete(constants.API.MOVIES.DELETE, {
      data: movieData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to update movies
   * @method update
   * @param {object} movieData
   * @param {string} movieData.movie_id the tag to update with
   * @param {string} movieData.name the id of the tag to update
   * @param {string} movieData.category_id the id of the tag to update
   * @param {string} movieData.tags the id of the tag to update
   * @return {object} return data from query
   */
  update: async movieData => {
    const response = await axios.post(constants.API.MOVIES.UPDATE, movieData);
    const data = await response;
    return data;
  },
};

export default moviesAPI;
