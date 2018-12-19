import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Heading, Image, Box } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { authService } from '../services/authService';
import cogitoPortrait from '../assets/images/cogito-portrait.svg';
import { Footer, RegistrationCard } from '../ui/components';
import { AuthRouteParams } from '../types/RouteParams';

const USER_INFO_QUERY = gql`
  query UserInfo($userID: Int!) {
    user(userId: $userID) {
      firstName
      lastName
      email
    }
  }
`;

const ACTIVATE_USER = gql`
  mutation ActivateUser($userID: Int!, $password: String!) {
    activateUser(userId: $userID, newPassword: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const RegisterContainer: FunctionComponent<RouteComponentProps<AuthRouteParams>> = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { userID } = match.params;
  const { data } = useQuery(USER_INFO_QUERY, { variables: { userID } });
  const registerPassword = useMutation(ACTIVATE_USER, { variables: { userID, password } });

  const onRegistration = () => {
    setLoading(true);
    registerPassword().then(({ data: mutationData }) => {
      const { token, user } = mutationData.activateUser;
      authService.authSuccess(token, user.id, history);
      setLoading(false);
    });
  };

  return (
    <Box flex background="gradient" fill>
      <Box flex="shrink" justify="center" align="center">
        <Heading level="2" color="light">
          Let’s join the community!
        </Heading>
      </Box>
      <Box flex="grow" direction="row" justify="center" align="center" gap="small">
        <Box flex align="center" pad="large">
          <Image src={cogitoPortrait} width="40%" />
        </Box>
        <Box flex align="center" pad="large">
          {data.user && (
            <RegistrationCard
              name={`${data.user.lastName} ${data.user.firstName}`}
              email={data.user.email}
              isRegistrationDisabled={password !== passwordCheck}
              isLoading={isLoading}
              onPasswordChange={setPassword}
              onPasswordCheckChange={setPasswordCheck}
              onRegistration={onRegistration}
            />
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
