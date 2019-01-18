import { ApolloError } from 'apollo-client';
import React, { FunctionComponent, useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NotificationContext } from '../../contexts/notification/NotificationContext';
import { authService } from '../../services/authService';
import { LoginCard } from '../../ui/components/Login/LoginCard';
import { LoginUserMutation, LoginUserMutationVariables } from './__generated__/LoginUserMutation';
import { LOGIN_USER } from './LoginUserMutation';

export const LoginContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { showNotification } = useContext(NotificationContext);
  const loginUser = useMutation<LoginUserMutation, LoginUserMutationVariables>(LOGIN_USER);

  const onLogin = (email: string, password: string, resetForm: () => void) =>
    loginUser({ variables: { email, password } })
      .then(({ data }) => authService.authSuccess(data.login.token, history))
      .catch((error: ApolloError) => {
        error.graphQLErrors.map(({ message }) => showNotification(message, 'error'));
        resetForm();
      });

  return <LoginCard onLogin={onLogin} />;
};
