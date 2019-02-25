import React, { FunctionComponent } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { useGraphQLErrorNotification } from '../../hooks/useGraphQLErrorNotification';
import { authService } from '../../services/authService';
import { LoginCard } from '../../ui/components/Login/LoginCard';
import { LoginUserMutation, LoginUserMutationVariables } from './__generated__/LoginUserMutation';
import { LOGIN_USER } from './LoginUserMutation';

export const LoginContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const displayGraphQLError = useGraphQLErrorNotification();
  const loginUser = useMutation<LoginUserMutation, LoginUserMutationVariables>(LOGIN_USER);

  const onLogin = (email: string, password: string, resetForm: () => void) =>
    loginUser({ variables: { email, password } })
      .then(({ data }) => authService.authSuccess(data.login.token, history))
      .catch(displayGraphQLError)
      .finally(() => resetForm());

  return <LoginCard onLogin={onLogin} />;
};
