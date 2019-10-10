import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../../core/hooks/use-graphql-error-notification';
import { routeBuilder } from '../../../core/route/route-builder';
import { ForgotPasswordCard } from '../ui/forgot-password/forgot-password-card';
import { useForgotPasswordMutation } from './graphql/forgot-password-mutation.generated';

export const ForgotPasswordContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const displayGraphQLError = useGraphQLErrorNotification();
  const [forgotPassword] = useForgotPasswordMutation();

  const onForgotPassword = (email: string, resetForm: () => void) =>
    forgotPassword({ variables: { email } })
      .then((result) => result && history.push(routeBuilder.emailSent()))
      .catch(displayGraphQLError)
      .finally(() => resetForm());

  return <ForgotPasswordCard onForgotPassword={onForgotPassword} />;
};
