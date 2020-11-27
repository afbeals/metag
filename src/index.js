// External
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Internal
import '~Styles/main.scss';
import { App, reportWebVitals, config } from './app/';

// Constants
const { store } = config;

/* istanbul ignore next */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* istanbul ignore next */
reportWebVitals();
