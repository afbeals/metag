// External
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'fontsource-roboto';

// Internal
import { Home } from '~Pages/';
import { theme as AppTheme } from '~Components/';
import userActions from '~Modules/user/actions';
import tagsActions from '~Modules/tags/actions';
import moviesActions from '~Modules/movies/actions';
import categoriesActions from '~Modules/categories/actions';
import { createFetchSelector } from '~Modules/fetch/selectors';
import '~Styles/main.scss';

const {
  user: {
    login: {
      request: userLogin,
      cancel: userLoginCancel,
      _meta: { isFetching: userIsFetching, isFetched: userIsFetched },
    },
  },
} = userActions;

const {
  tags: {
    get: {
      request: getTags,
      cancel: getTagsCancel,
      _meta: { isFetching: tagsIsFetching, isFetched: tagsIsFetched },
    },
  },
} = tagsActions;

const {
  movies: {
    all: {
      request: getMovies,
      cancel: getMoviesCancel,
      _meta: { isFetching: moviesIsFetching, isFetched: moviesIsFetched },
    },
  },
} = moviesActions;

const {
  categories: {
    getall: {
      request: getCat,
      cancel: getCatCancel,
      _meta: { isFetching: catIsFetching, isFetched: catIsFetched },
    },
  },
} = categoriesActions;

const App = () => {
  const [isLoaded, updateIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const fetchSelector = createFetchSelector();
  const catFetched = useSelector(state => fetchSelector(state, catIsFetched));
  const movieFetched = useSelector(state =>
    fetchSelector(state, moviesIsFetched)
  );
  const tagsFetched = useSelector(state => fetchSelector(state, tagsIsFetched));
  const userFetched = useSelector(state => fetchSelector(state, userIsFetched));

  useEffect(() => {
    if (catFetched && movieFetched && tagsFetched && userFetched && !isLoaded) {
      updateIsLoaded(true);
    }
  }, [catFetched, movieFetched, tagsFetched, userFetched]);
  useEffect(() => {
    dispatch(userLogin({ username: 'docjrabg' }));
    dispatch(getTags());
    dispatch(getMovies());
    dispatch(getCat());

    return () => {
      if (catIsFetching) getCatCancel();
      if (moviesIsFetching) getMoviesCancel();
      if (tagsIsFetching) getTagsCancel();
      if (userIsFetching) userLoginCancel();
    };
  }, []);

  return (
    <AppTheme>
      <div id='app'>
        {isLoaded && <Home />}
        {!isLoaded && <> loading </>}
      </div>
    </AppTheme>
  );
};

export default App;
