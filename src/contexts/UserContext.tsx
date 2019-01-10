import gql from 'graphql-tag';
import React, { createContext, FunctionComponent } from 'react';
import { useQuery } from 'react-apollo-hooks';

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      firstName
      lastName
      email
      neptun
    }
  }
`;

interface UserContextState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  neptun: string;
}

export const UserContext = createContext<UserContextState | undefined>(undefined);

export const UserConsumer = UserContext.Consumer;

export const UserProvider: FunctionComponent = ({ children }) => {
  const { data } = useQuery(ME_QUERY);

  return <UserContext.Provider value={data && data.me && { ...data.me }}>{children}</UserContext.Provider>;
};
