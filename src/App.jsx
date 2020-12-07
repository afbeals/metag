// External
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'fontsource-roboto';

// Internal
import { Home } from '~Pages/';
import AppTheme from '~Components/theme';
import userActions from '~Modules/user/actions';
import tagsActions from '~Modules/tags/actions';
import moviesActions from '~Modules/movies/actions';
import categoriesActions from '~Modules/categories/actions';
import '~Styles/main.scss';

const {
  user: {
    login: {
      request: userLogin,
      cancel: userLoginCancel,
      _meta: { isFetching: userIsFetching },
    },
  },
} = userActions;

const {
  tags: {
    get: {
      request: getTags,
      cancel: getTagsCancel,
      _meta: { isFetching: tagsIsFetching },
    },
  },
} = tagsActions;

const {
  movies: {
    all: {
      request: getMovies,
      cancel: getMoviesCancel,
      _meta: { isFetching: moviesIsFetching },
    },
  },
} = moviesActions;

const {
  categories: {
    getall: {
      request: getCat,
      cancel: getCatCancel,
      _meta: { isFetching: catIsFetching },
    },
  },
} = categoriesActions;

const App = () => {
  const dispatch = useDispatch();
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
  }, [dispatch]);
  return (
    <AppTheme>
      <div id='app'>
        <Home />
      </div>
    </AppTheme>
  );
};

export default App;
