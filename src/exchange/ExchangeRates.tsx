import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router-dom';
import { Box, Heading } from 'grommet';

import { Money } from '../types/Money';
import { ExchangeCard } from './ExchangeCard';

type Props = {
  currency: string;
};

export const ExchangeRates: FunctionComponent<RouteComponentProps<Props>> = (props) => {
  const currencyCode = props.match.params.currency.toUpperCase();

  const renderError = <Heading level="2">Error :(</Heading>;
  const renderLoading = <Heading level="2">Loading..</Heading>;

  const renderList = (rates: Money[]): React.ReactNode => (
    <Box
      pad="small"
      gap="medium"
      justify="center"
      alignContent="between"
      direction="row-responsive"
      fill="vertical"
      wrap
    >
      {rates.map(({ currency, rate }: Money) => (
        <ExchangeCard key={currency} currency={currency} rate={rate} baseCurrency={currencyCode} />
      ))}
    </Box>
  );

  return (
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
  );
};
