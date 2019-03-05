import React, { Fragment, FunctionComponent } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { useGraphQLErrorNotification } from '../../hooks/useGraphQLErrorNotification';
import { useTokenValidation } from '../../hooks/useTokenValidation';
import { routeBuilder } from '../../route/routeBuilder';
import { AuthRouteParams } from '../../types/RouteParams';
import { RegistrationCard } from '../../ui/components';
import { ACTIVATE_USER } from './ActivateUserMutation';
import { USER_INFO_QUERY } from './UserInfoQuery';
import { ActivateUserMutation, ActivateUserMutationVariables } from './__generated__/ActivateUserMutation';
import { UserInfoQuery, UserInfoQueryVariables } from './__generated__/UserInfoQuery';

export const RegisterContainer: FunctionComponent<RouteComponentProps<AuthRouteParams>> = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const userID = params.get('id') || '';
  const token = params.get('token') || '';

  useTokenValidation(token, history);
  const displayGraphQLError = useGraphQLErrorNotification();
  const { data } = useQuery<UserInfoQuery, UserInfoQueryVariables>(USER_INFO_QUERY, { variables: { userID } });
  const registerPassword = useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ACTIVATE_USER);

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
