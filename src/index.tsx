import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app';
import { isProduction } from './environment/config';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Allow only error log messages in production mode
const empty = () => {};
if (isProduction) {
  console.log = empty;
  console.info = empty;
  console.debug = empty;
  console.warn = empty;
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root') as HTMLElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
