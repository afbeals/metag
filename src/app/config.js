// External
import { configureStore } from '@reduxjs/toolkit';

// Internal
import { rootReducer, rootMiddleware } from '~Modules/';
const configureDevTools =
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__({
    maxAge: 25,
    trace: true,
  });

const store = configureStore({
  reducer: rootReducer(),
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    ...rootMiddleware,
  ],
  devTools: false,
  enhancers: [configureDevTools],
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('~Modules/rootReducer', () => {
    const newRootReducer = require('~Modules/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default { store };
