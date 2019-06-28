import React, { FunctionComponent } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../hooks/use-graphql-error-notification';
import { authService } from '../../services/auth-service';
import { LoginCard } from '../../ui/components/login/login-card';
import { LOGIN_USER } from './login-user-mutation';
import { LoginUserMutation, LoginUserMutationVariables } from './__generated__/LoginUserMutation';

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
