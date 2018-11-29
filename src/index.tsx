import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app/App';
import { config } from './environment/config';

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
