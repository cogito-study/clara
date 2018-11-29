import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { App } from './app/App';
import { config } from './environment/config';
import * as serviceWorker from './serviceWorker';

// Allow only error log messages in production mode
// tslint:disable-next-line
const empty = () => {};
if (config.environment === 'production') {
  console.log = empty;
  console.info = empty;
  console.debug = empty;
  console.warn = empty;
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
