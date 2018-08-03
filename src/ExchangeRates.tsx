import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

interface Money {
  currency: string;
  rate: string;
}

export const ExchangeRates: React.SFC<{}> = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error :(</p>;
      }

      return data.rates.map(({ currency, rate }: Money) => (
        <div key={currency}>
          <p>{`${currency}: ${rate}`}</p>
        </div>
      ));
    }}
  </Query>
);
