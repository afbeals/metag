// External
import { combineReducers } from '@reduxjs/toolkit';

// Internal
import app from './app/reducer';
import fetch from './fetch/reducer';
import user from './user/reducer';

export default () =>
  combineReducers({
    app,
    fetch,
    user,
  });
