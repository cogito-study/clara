import React, { Fragment, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../../core/hooks/use-graphql-error-notification';
import { routeBuilder } from '../../../core/route/route-builder';
import { AuthRouteParams } from '../../../core/types/route-params';
import { RegistrationCard } from '../ui/registration/registration-card';
import { useActivateUserMutation } from './graphql/activate-user-mutation.generated';
import { useUserInfoQuery } from './graphql/user-info-query.generated';

export const RegisterContainer: FunctionComponent<RouteComponentProps<AuthRouteParams>> = ({
  history,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const userID = params.get('id') || '';
  const token = params.get('token') || '';

  const displayGraphQLError = useGraphQLErrorNotification();
  const { data } = useUserInfoQuery({ variables: { userID } });
  const [registerPassword] = useActivateUserMutation();

  const onRegistration = (password: string, resetForm: () => void) => {
    registerPassword({ variables: { token, password } })
      .then(() => history.push(routeBuilder.login()))
      .catch(displayGraphQLError)
      .finally(() => resetForm());
  };

  return (
    <Fragment>
      {data && data.user && (
        <RegistrationCard
          name={`${data.user.lastName} ${data.user.firstName}`}
          email={data.user.email}
          onRegistration={onRegistration}
        />
      )}
    </Fragment>
  );
};
