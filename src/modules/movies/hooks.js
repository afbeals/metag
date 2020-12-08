// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func, array, string } from 'prop-types';

// Internal
import * as selectors from './selectors';
import { createFetchSelector } from '../fetch/selectors';
import actions from './actions';

const {
  movies: {
    all: {
      request: allReq,
      cancel: allCancel,
      _meta: { isFetching: allIsFetching, isFetched: allIsFetched },
    },
    under_cat: { request: under_catReq, cancel: under_catCancel },
    under_tag: {
      request: under_tagReq,
      cancel: under_tagCancel,
      _meta: { isFetching: underTagIsFetching },
    },
    search: { request: searchReq, cancel: searchCancel, clear: searchClear },
    select: { movie: selectMovie },
    add: { request: addReq, cancel: addCancel },
    delete: { request: deleteReq, cancel: deleteCancel },
    update: { request: updateReq, cancel: updateCancel },
  },
} = actions;
// Constants
/**
 * @method useMovies
 * @desc connect to movies store
 * @example
 * const { movieList } = useMovies();
 */
export const useMovies = () => {
  const dispatch = useDispatch();
  const fetchSelector = createFetchSelector();

  const props = {
    // selectors
    movieStore: useSelector(selectors.getMoviesStore),
    movieList: useSelector(selectors.getMoviesList),
    movieSelectedId: useSelector(selectors.getSelectedMovieId),
    movieSelected: useSelector(selectors.getSelectedMovie),
    movieListArray: useSelector(selectors.getMovieListArray),
    movieSearchInfo: useSelector(selectors.getMoviesSearch),
    movieAllIsFetching: useSelector(store =>
      fetchSelector(store, allIsFetching)
    ),
    movieAllIsFetched: useSelector(store => fetchSelector(store, allIsFetched)),
    movieUnderTagIsFetching: useSelector(store =>
      fetchSelector(store, underTagIsFetching)
    ),
    // actions
    movieFetch: () => dispatch(allReq()),
    movieFetchCancel: () => dispatch(allCancel()),
    movieUnderCat: info => dispatch(under_catReq(info)),
    movieUnderCatCancel: () => dispatch(under_catCancel()),
    movieUnderTag: info => dispatch(under_tagReq(info)),
    movieUnderTagCancel: () => dispatch(under_tagCancel()),
    movieSearch: () => dispatch(searchReq()),
    movieSearchCancel: () => dispatch(searchCancel()),
    movieSearchClear: () => dispatch(searchClear()),
    movieSelect: info => dispatch(selectMovie(info)),
    movieAdd: () => dispatch(addReq()),
    movieAddCancel: () => dispatch(addCancel()),
    movieDelete: () => dispatch(deleteReq()),
    movieDeleteCancel: () => dispatch(deleteCancel()),
    movieUpdate: () => dispatch(updateReq()),
    movieUpdateCancel: () => dispatch(updateCancel()),
  };

  const propTypes = {
    movieStore: object.isRequired,
    movieList: object,
    movieSelectedId: string,
    movieSelected: object,
    movieListArray: array,
    movieSearchInfo: object,
    // actions
    movieFetch: func.isRequired,
    movieFetchCancel: func.isRequired,
    movieUnderCat: func.isRequired,
    movieUnderCatCancel: func.isRequired,
    movieUnderTag: func.isRequired,
    movieUnderTagCancel: func.isRequired,
    movieSearch: func.isRequired,
    movieSearchCancel: func.isRequired,
    movieSearchClear: func.isRequired,
    movieSelect: func.isRequired,
    movieAdd: func.isRequired,
    movieAddCancel: func.isRequired,
    movieDelete: func.isRequired,
    movieDeleteCancel: func.isRequired,
    movieUpdate: func.isRequired,
    movieUpdateCancel: func.isRequired,
  };

  checkPropTypes(propTypes, props, 'prop', `Hook: useMovies`);

  return props;
};

export default {
  useMovies,
};
