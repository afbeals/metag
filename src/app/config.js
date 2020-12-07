// External
import { configureStore } from '@reduxjs/toolkit';
import createSagaMW from 'redux-saga';

// Internal
import { rootReducer, rootSaga } from '~Modules/';
const sagaMW = createSagaMW();

const store = configureStore({
  reducer: rootReducer(),
  middleware: cdm => cdm().concat(sagaMW),
  devTools: {
    maxAge: 25,
    trace: true,
  },
});

sagaMW.run(rootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../modules/', () => {
    const newRootReducer = require('../modules/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default { store };
