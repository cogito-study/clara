import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

export const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
});

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then((result) => console.log(result));
