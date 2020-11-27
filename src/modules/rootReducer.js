// External
import { combineReducers } from '@reduxjs/toolkit';

// Internal
import app from './app/reducer';

export default () =>
  combineReducers({
    app,
  });
