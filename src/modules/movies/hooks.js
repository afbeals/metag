// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func, array, string } from 'prop-types';

// Internal
import * as selectors from './selectors';
import { createFetchSelector } from '../fetch/selectors';
import actions from './actions';
import { bool } from 'prop-types';

const {
  movies: {
    all: {
      request: allReq,
      cancel: allCancel,
      _meta: { isFetching: allIsFetching, isFetched: allIsFetched },
    },
    under_group: {
      request: underGroup,
      cancel: underGroupCancel,
      _meta: { isFetching: underGroupIsFetching },
    },
    under_cat: {
      request: under_catReq,
      cancel: under_catCancel,
      _meta: { isFetching: underCatIsFetching },
    },
    under_tag: {
      request: under_tagReq,
      cancel: under_tagCancel,
      _meta: { isFetching: underTagIsFetching },
    },
    search: {
      request: searchReq,
      cancel: searchCancel,
      clear: searchClear,
      _meta: { isFetching: movieSearchIsFetching },
    },
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
    movieUnderCatIsFetching: useSelector(store =>
      fetchSelector(store, underCatIsFetching)
    ),
    movieUnderGroupIsFetching: useSelector(store =>
      fetchSelector(store, underGroupIsFetching)
    ),
    movieAllIsFetched: useSelector(store => fetchSelector(store, allIsFetched)),
    movieUnderTagIsFetching: useSelector(store =>
      fetchSelector(store, underTagIsFetching)
    ),
    movieSearchIsFetching: useSelector(store =>
      fetchSelector(store, movieSearchIsFetching)
    ),
    // actions
    movieFetch: () => dispatch(allReq()),
    movieFetchCancel: () => dispatch(allCancel()),
    movieUnderCat: info => dispatch(under_catReq(info)),
    movieUnderCatCancel: () => dispatch(under_catCancel()),
    movieUnderGroup: info => dispatch(underGroup(info)),
    movieUnderGroupCancel: () => dispatch(underGroupCancel()),
    movieUnderTag: info => dispatch(under_tagReq(info)),
    movieUnderTagCancel: () => dispatch(under_tagCancel()),
    movieSearch: info => dispatch(searchReq(info)),
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
    movieSearchIsFetching: bool.isRequired,
    movieUnderGroupIsFetching: bool.isRequired,
    movieUnderCatIsFetching: bool.isRequired,
    movieUnderTagIsFetching: bool.isRequired,
    movieAllIsFetching: bool.isRequired,
    movieAllIsFetched: bool.isRequired,
    // actions
    movieFetch: func.isRequired,
    movieFetchCancel: func.isRequired,
    movieUnderCat: func.isRequired,
    movieUnderCatCancel: func.isRequired,
    movieUnderGroup: func.isRequired,
    movieUnderGroupCancel: func.isRequired,
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
