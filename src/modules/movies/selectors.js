// External
import { createSelector } from 'reselect'; // selector package

// Internal
import { indexedToArray } from '~GlobalUtil/normalize';

// Constants
const getMovies = state => state.movies; // select item in store to use

/**
 * @name getMoviesStore
 * @param {object} getMovies store object
 * @return {object} the store data
 */
export const getMoviesStore = createSelector([getMovies], store => store);

/**
 * @name getMoviesList
 * @param {object} getMoviesStore store object
 * @return {object} the store data
 */
export const getMoviesList = createSelector(
  [getMoviesStore],
  store => store.list
);

/**
 * @name getSelectedMovieId
 * @param {object} getMoviesList store object
 * @return {object} the store data
 */
export const getSelectedMovieId = createSelector(
  [getMoviesStore],
  store => store.selectedId
);

/**
 * @name getSelectedMovie
 * @param {object} getMoviesList store object
 * @param {Number} getSelectedMovieId the selected movie Id
 * @return {object} the store data
 */
export const getSelectedMovie = createSelector(
  [getMoviesList, getSelectedMovieId],
  (movieList, id) => movieList[id] || null
);

/**
 * @name getMovieListArray
 * @param {object} getMoviesList store object
 * @return {array} the tag list array
 */
export const getMovieListArray = createSelector([getMoviesList], list =>
  indexedToArray({ indexedList: list })
);

/**
 * @name getMoviesSearch
 * @param {object} getMoviesStore store object
 * @return {object} the store data
 */
export const getMoviesSearch = createSelector(
  [getMoviesStore],
  store => store.search
);
