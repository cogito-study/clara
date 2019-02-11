import { ApolloError } from 'apollo-client';
import React, { FunctionComponent, useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NotificationContext } from '../../contexts/notification/NotificationContext';
import { ResetPasswordMutation, ResetPasswordMutationVariables } from './__generated__/ResetPasswordMutation';
import { RESET_PASSWORD } from './ResetPasswordMutation';
import { routeBuilder } from '../../route/routeBuilder';
import { RegistrationForm } from '../../ui/components/Registration/RegistrationForm';

export const ForgotPasswordContainer: FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const { showNotification } = useContext(NotificationContext);
  const resetPassword = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(RESET_PASSWORD);
  const params = new URLSearchParams(location.search);
  const token = params.get('token')!;
  const onRegistration = (password: string, resetForm: () => void) =>
    resetPassword({ variables: { token, password } })
      .then((result) => {
        if (result) {
          showNotification('A jelszó sikeresen vissza lett állítva!');
          history.push(routeBuilder.login());
        }
      })
      .catch((error: ApolloError) => {
        error.graphQLErrors.map(({ message }) => showNotification(message, 'error'));
        resetForm();
      });
  return <RegistrationForm onRegistration={onRegistration} />;
};
