// External
import { combineReducers } from '@reduxjs/toolkit';

// Internal
import app from './app/reducer';
import categories from './categories/reducer';
import fetch from './fetch/reducer';
import movies from './movies/reducer';
import tags from './tags/reducer';
import user from './user/reducer';
import groups from './groups/reducer';

export default () =>
  combineReducers({
    app,
    categories,
    fetch,
    groups,
    movies,
    tags,
    user,
  });
