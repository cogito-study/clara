import React, { FunctionComponent } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../hooks/useGraphQLErrorNotification';
import { routeBuilder } from '../../route/routeBuilder';
import { ForgotPasswordCard } from '../../ui/components/ForgotPassword/ForgetPasswordCard';
import { FORGOT_PASSWORD } from './ForgotPasswordMutation';
import { ForgotPasswordMutation, ForgotPasswordMutationVariables } from './__generated__/ForgotPasswordMutation';

export const ForgotPasswordContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const displayGraphQLError = useGraphQLErrorNotification();
  const forgotPassword = useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(FORGOT_PASSWORD);

  const onForgotPassword = (email: string, resetForm: () => void) =>
    forgotPassword({ variables: { email } })
      .then((result) => result && history.push(routeBuilder.emailSent()))
      .catch(displayGraphQLError)
      .finally(() => resetForm());

  return <ForgotPasswordCard onForgotPassword={onForgotPassword} />;
};
