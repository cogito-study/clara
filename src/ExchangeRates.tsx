import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router-dom';
import { Heading, Label } from 'rebass';
import { Flex, Box } from 'grid-styled';

import { Money } from './money';

export const ExchangeRates: React.SFC<RouteComponentProps<{ currency: string }>> = (props) => {
  const currencyCode = props.match.params.currency.toUpperCase();

  const renderError: React.ReactNode = (
    <Heading fontSize={3} color="red">
      Error :(
    </Heading>
  );

  const renderLoading: React.ReactNode = (
    <Heading fontSize={3} color="green">
      Loading..
    </Heading>
  );

  const renderList = (rates: Money[]): React.ReactNode =>
    rates.map(({ currency, rate }: Money) => (
      <Box key={currency} width={1 / 3}>
        <Label m={1} fontSize={3}>
          <b>{currency} </b> 📈 {rate}
          {currencyCode}
        </Label>
      </Box>
    ));

  return (
    <Flex flexDirection="column">
      <Query
        query={gql`
          {
            rates(currency: "${currencyCode}") {
              currency
              rate
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return renderLoading;
          }

          if (error) {
            return renderError;
          }

          return renderList(data.rates);
        }}
      </Query>
    </Flex>
  );
};
