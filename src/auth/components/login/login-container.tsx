import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../../core/hooks/use-graphql-error-notification';
import { authService } from '../../services/auth-service';
import { LoginCard } from '../ui/login/login-card';
import { useLoginUserMutation } from './graphql/login-user-mutation.generated';

export const LoginContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const displayGraphQLError = useGraphQLErrorNotification();
  const [loginUser] = useLoginUserMutation();

  const onLogin = (email: string, password: string, resetForm: () => void) =>
    loginUser({ variables: { email, password } })
      .then(({ data }) => data && authService.authSuccess(data.login.token, history))
      .catch(displayGraphQLError)
      .finally(() => resetForm());

  return <LoginCard onLogin={onLogin} />;
};
