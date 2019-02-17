import { ApolloError } from 'apollo-client';
import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { NotificationContext } from '../../contexts/notification/NotificationContext';
import { routeBuilder } from '../../route/routeBuilder';
import { ResetPasswordCard } from '../../ui/components/ForgotPassword/ResetPasswordCard';
import { CHECK_TOKEN_MUTATION } from '../common/mutations/CheckTokenMutation';
import { CheckTokenMutation, CheckTokenMutationVariables } from '../common/mutations/__generated__/CheckTokenMutation';
import { RESET_PASSWORD } from './ResetPasswordMutation';
import { ResetPasswordMutation, ResetPasswordMutationVariables } from './__generated__/ResetPasswordMutation';

export const ResetPasswordContainer: FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const { showNotification } = useContext(NotificationContext);

  const resetPassword = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(RESET_PASSWORD);
  const checkToken = useMutation<CheckTokenMutation, CheckTokenMutationVariables>(CHECK_TOKEN_MUTATION);

  const params = new URLSearchParams(location.search);
  const token = params.get('token')!;

  useEffect(() => {
    checkToken({ variables: { token } }).then(
      ({ data: { checkTokenValid } }) => !checkTokenValid && history.push(routeBuilder.linkExpired()),
    );
  });

  const onReset = (password: string, resetForm: () => void) =>
    resetPassword({ variables: { token, password } })
      .then((result) => {
        if (result) {
          history.push(routeBuilder.resetDone());
        }
      })
      .catch((error: ApolloError) => {
        error.graphQLErrors.map(({ message }) => showNotification(message, 'error'));
        resetForm();
      });

  return <ResetPasswordCard onReset={onReset} />;
};
