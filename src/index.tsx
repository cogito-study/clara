import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './core/app';
import { isProduction } from './core/environment/config';
import './core/i18n';

// Allow only error log messages in production mode
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
if (isProduction) {
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root') as HTMLElement,
);
