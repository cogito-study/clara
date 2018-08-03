import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import { client } from './client';
import { ExchangeRates } from './ExchangeRates';
import logo from './logo.svg';

const AppContainer = styled.div`
  text-align: center;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Logo = styled.img`
  animation: ${spin} infinite 20s linear;
  height: 80px;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const Intro = styled.p`
  font-size: large;
`;

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer>
          <Header>
            <Logo src={logo} alt="logo" />
            <Title>Welcome to React with TypeScript!</Title>
          </Header>

          <Intro>
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </Intro>

          <ExchangeRates />
        </AppContainer>
      </ApolloProvider>
    );
  }
}

export default App;
