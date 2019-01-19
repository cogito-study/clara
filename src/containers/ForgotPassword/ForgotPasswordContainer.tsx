import { ApolloError } from 'apollo-client';
import React, { FunctionComponent, useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NotificationContext } from '../../contexts/notification/NotificationContext';
import { ForgotPasswordCard } from '../../ui/components/ForgotPassword/ForgetPasswordCard';
import { ForgotPasswordMutation, ForgotPasswordMutationVariables } from './__generated__/ForgotPasswordMutation';
import { FORGOT_PASSWORD } from './ForgotPasswordMutation';

export const ForgotPasswordContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { showNotification } = useContext(NotificationContext);
  const forgotPassword = useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(FORGOT_PASSWORD);

  const onForgetPassword = (email: string, resetForm: () => void) =>
    forgotPassword({ variables: { email } })
      .then(({ data }) => {
        if (data.forgotPassword) {
          showNotification('A jelszóváltoztatási instrukciókat a megadott e-mail címre elküldtük.');
        }
      })
      .catch((error: ApolloError) => {
        error.graphQLErrors.map(({ message }) => showNotification(message, 'error'));
        resetForm();
      });

  return <ForgotPasswordCard onForgotPassword={onForgetPassword} />;
};
