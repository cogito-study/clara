import React, { FunctionComponent } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../hooks/use-graphql-error-notification';
import { useTokenValidation } from '../../hooks/use-token-validation';
import { routeBuilder } from '../../route/route-builder';
import { ResetPasswordCard } from '../../ui/components/forgot-password/reset-password-card';
import { RESET_PASSWORD } from './reset-password-mutation';
import { ResetPasswordMutation, ResetPasswordMutationVariables } from './__generated__/ResetPasswordMutation';

export const ResetPasswordContainer: FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const token = params.get('token') || '';

  const displayGraphQLError = useGraphQLErrorNotification();
  const resetPassword = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(RESET_PASSWORD);
  useTokenValidation(token, history);

  const onReset = (password: string, resetForm: () => void) =>
    resetPassword({ variables: { token, password } })
      .then((result) => result && history.push(routeBuilder.resetDone()))
      .catch(displayGraphQLError)
      .finally(() => resetForm());

  return <ResetPasswordCard onReset={onReset} />;
};
