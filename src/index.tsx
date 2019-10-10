import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './core/app';
import { isProduction } from './core/environment/config';

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
