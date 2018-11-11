import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Grommet, Heading } from 'grommet';

import { client } from '../services/client';
import { theme } from '../ui-kit/theme/theme';
import { PATH } from '../constants/path';
import { ExchangeRates } from '../exchange/ExchangeRates';

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export const App = () => (
  <ApolloProvider client={client}>
    <Grommet theme={theme} full>
      <Router>
        <>
          <Button primary>
            <NavLink to={PATH.EUR_RATE}>EUR Rates</NavLink>
          </Button>
          <Button primary>
            <NavLink to={PATH.USD_RATE}>USD Rates</NavLink>
          </Button>
          <Button primary>
            <NavLink to={PATH.ROOT}>Home</NavLink>
          </Button>

          <Route exact path={PATH.ROOT} render={() => <Heading>Hello Typescript Grommet</Heading>} />
          <Route path={PATH.CURRENCY_PARAM} component={ExchangeRates} />
        </>
      </Router>
    </Grommet>
  </ApolloProvider>
);
