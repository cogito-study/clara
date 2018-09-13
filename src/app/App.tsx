import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Heading, Button } from 'rebass';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { client } from '../services/client';
import { theme } from '../ui-kit/theme/theme';
import { PATH } from '../constants/path';
import { ExchangeRates } from '../exchange/ExchangeRates';

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

export const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Button m={1}>
            <NavLink to={PATH.EUR_RATE}>EUR Rates</NavLink>
          </Button>
          <Button m={1}>
            <NavLink to={PATH.USD_RATE}>USD Rates</NavLink>
          </Button>
          <Button m={1}>
            <NavLink to={PATH.ROOT}>Home</NavLink>
          </Button>

          <Route exact path={PATH.ROOT} render={() => <Heading>Hello Typescript Rebass</Heading>} />
          <Route path={PATH.CURRENCY_PARAM} component={ExchangeRates} />
        </Container>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);
