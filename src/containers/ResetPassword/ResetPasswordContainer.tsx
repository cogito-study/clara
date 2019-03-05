import React, { FunctionComponent } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../hooks/useGraphQLErrorNotification';
import { useTokenValidation } from '../../hooks/useTokenValidation';
import { routeBuilder } from '../../route/routeBuilder';
import { ResetPasswordCard } from '../../ui/components/ForgotPassword/ResetPasswordCard';
import { RESET_PASSWORD } from './ResetPasswordMutation';
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
