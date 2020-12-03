// External
import { useDispatch, useSelector } from 'react-redux';
import { checkPropTypes, object, func, array, string } from 'prop-types';

// Internal
import * as selectors from './selectors';
import actions from './actions';

const {
  movies: {
    all: { request: allReq, cancel: allCancel },
    under_cat: { request: under_catReq, cancel: under_catCancel },
    under_tag: { request: under_tagReq, cancel: under_tagCancel },
    search: { request: searchReq, cancel: searchCancel, clear: searchClear },
    select: { movie: selectMovie },
    add: { request: addReq, cancel: addCancel },
    delete: { request: deleteReq, cancel: deleteCancel },
    update: { request: updateReq, cancel: updateCancel },
  },
} = actions;
// Constants
const moviesHooks = {
  /**
   * @method useMovies
   * @desc connect to movies store
   * @example
   * const { movieList } = useMovies();
   */
  useMovies: () => {
    const dispatch = useDispatch();

    const props = {
      // selectors
      movieStore: useSelector(selectors.getMoviesStore),
      movieList: useSelector(selectors.getMoviesList),
      movieSelectedId: useSelector(selectors.getSelectedMovieId),
      movieSelected: useSelector(selectors.getSelectedMovie),
      movieListArray: useSelector(selectors.getMovieListArray),
      movieSearchInfo: useSelector(selectors.getMoviesSearch),
      // actions
      movieFetch: () => dispatch(allReq()),
      movieFetchCancel: () => dispatch(allCancel()),
      movieUnderCat: () => dispatch(under_catReq()),
      movieUnderCatCancel: () => dispatch(under_catCancel()),
      movieUnderTag: () => dispatch(under_tagReq()),
      movieUnderTagCancel: () => dispatch(under_tagCancel()),
      movieSearch: () => dispatch(searchReq()),
      movieSearchCancel: () => dispatch(searchCancel()),
      movieSearchClear: () => dispatch(searchClear()),
      movieSelect: () => dispatch(selectMovie()),
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
  },
};

export default moviesHooks;
