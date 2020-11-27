// External
import { combineReducers } from '@reduxjs/toolkit';

// Internal
import app from './app/reducer';
import fetch from './fetch/reducer';

export default () =>
  combineReducers({
    app,
    fetch,
  });
