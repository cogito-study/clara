import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { RegistrationCard } from '../ui/registration/registration-card';
import { useUserInfoQuery } from './graphql/user-info-query.generated';

export const RegisterContainer = () => {
  const { activateUser } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userID = params.get('id') || '';
  const token = params.get('token') || '';

  const { data } = useUserInfoQuery({ variables: { userID } });

  const onRegistration = (password: string, resetForm: () => void) => {
    activateUser(password, token);
    resetForm();
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
