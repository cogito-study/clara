import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider, Heading, Button } from 'rebass';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import { client } from './client';
import { theme } from './theme';
import { ExchangeRates } from './ExchangeRates';

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Provider theme={theme}>
            <Button m={1}>
              <NavLink to="/rates/eur">EUR Rates</NavLink>
            </Button>
            <Button m={1}>
              <NavLink to="/rates/usd">USD Rates</NavLink>
            </Button>
            <Button m={1}>
              <NavLink to="">Home</NavLink>
            </Button>

            <Route exact path="/" render={() => <Heading>Hello Typescript Rebass</Heading>} />
            <Route path="/rates/:currency" component={ExchangeRates} />
          </Provider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
