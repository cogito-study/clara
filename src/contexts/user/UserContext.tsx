import React, { createContext, FunctionComponent } from 'react';
import { useQuery } from 'react-apollo-hooks';

import { LoggedInUserQuery, LoggedInUserQuery_me } from './__generated__/LoggedInUserQuery';
import { LOGGED_IN_USER_QUERY } from './LoggedInUserQuery';

interface UserContextState {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  neptun: string;
}

export const UserContext = createContext<UserContextState | null | undefined>(undefined);

export const UserConsumer = UserContext.Consumer;

export const UserProvider: FunctionComponent = ({ children }) => {
  const { data } = useQuery<LoggedInUserQuery>(LOGGED_IN_USER_QUERY);

  const userContextState = ({ firstName, lastName, ...rest }: LoggedInUserQuery_me): UserContextState => ({
    ...rest,
    firstName: firstName || '',
    lastName: lastName || '',
    fullName: firstName && lastName ? `${lastName} ${firstName}` : '',
  });

  return <UserContext.Provider value={data && data.me && userContextState(data.me)}>{children}</UserContext.Provider>;
};
