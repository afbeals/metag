// External
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'fontsource-roboto';

// Internal
import { Home } from '~Pages/';
import { useAppOverlay } from '~Modules/app/hooks';
import userActions from '~Modules/user/actions';
import tagsActions from '~Modules/tags/actions';
import moviesActions from '~Modules/movies/actions';
import categoriesActions from '~Modules/categories/actions';
import { actions as groupsActions } from '~Modules/groups/';
import { util as movieUtil } from '~Modules/movies/';
import { util as catUtil } from '~Modules/categories/';
import { util as groupsUtil } from '~Modules/groups/';
import { theme as AppTheme, Overlay } from '~Components/';
import { api, normalize } from '~GlobalUtil';
import '~Styles/main.scss';

// Constants
const { arrayToIndexed } = normalize;
const {
  user: {
    login: { success: userLoginSuccess },
  },
} = userActions;

const {
  tags: {
    get: { success: getTagsSuccess },
  },
} = tagsActions;

const {
  movies: {
    all: { success: getMoviesSuccess },
  },
} = moviesActions;

const {
  categories: {
    getall: { success: getCatSuccess },
  },
} = categoriesActions;

const {
  groups: {
    getall: { success: getGroupsSuccess },
  },
} = groupsActions;

const App = () => {
  const { appShowOverlay, appHideOverlay } = useAppOverlay();
  const [isLoaded, updateIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appShowOverlay());
    Promise.all([
      api.movie
        .all()
        .then(({ data }) =>
          dispatch(getMoviesSuccess(movieUtil.normalizeMoviesArray(data)))
        ),
      api.user
        .login({ username: 'docjrabg' })
        .then(({ data }) => dispatch(userLoginSuccess(data))),
      api.tags
        .fetch()
        .then(({ data }) =>
          dispatch(getTagsSuccess(arrayToIndexed({ array: data })))
        ),
      api.cat
        .fetchAll()
        .then(({ data }) =>
          dispatch(getCatSuccess(catUtil.normalizeCategoriesArray(data)))
        ),
      api.group
        .get_all()
        .then(({ data }) =>
          dispatch(getGroupsSuccess(groupsUtil.normalizeGroupsArray(data)))
        ),
    ]).then(() => {
      updateIsLoaded(true);
      appHideOverlay();
    });
  }, []);

  return (
    <AppTheme>
      <div id='app'>
        {isLoaded && <Home />}
        <Overlay text='Loading App...' />
      </div>
    </AppTheme>
  );
};

export default App;
