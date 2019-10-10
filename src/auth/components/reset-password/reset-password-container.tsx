import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../../core/hooks/use-graphql-error-notification';
import { routeBuilder } from '../../../core/route/route-builder';
import { ResetPasswordCard } from '../ui/forgot-password/reset-password-card';
import { useResetPasswordMutation } from './graphql/reset-password-mutation.generated';

export const ResetPasswordContainer: FunctionComponent<RouteComponentProps> = ({
  history,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const token = params.get('token') || '';

  const displayGraphQLError = useGraphQLErrorNotification();
  const [resetPassword] = useResetPasswordMutation();

  const onReset = (password: string, resetForm: () => void) =>
    resetPassword({ variables: { token, password } })
      .then((result) => result && history.push(routeBuilder.resetDone()))
      .catch(displayGraphQLError)
      .finally(() => resetForm());

  return <ResetPasswordCard onReset={onReset} />;
};
