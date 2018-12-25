import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Heading, Image, Box } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { authService } from '../services/authService';
import cogitoPortrait from '../assets/images/cogito-portrait.svg';
import { Footer, RegistrationCard } from '../ui/components';
import { AuthRouteParams } from '../types/RouteParams';
import styled from 'styled-components';

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

const MottoHeading = styled(Heading)`
  font-weight: 700;
`;

const UnresponsiveBox = styled(Box)`
  min-width: 1000px;
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
    <UnresponsiveBox flex background="gradient" fill>
      <Box justify="center" align="center">
        <MottoHeading level="1" color="nightBlue">
          Let’s join the community!
        </MottoHeading>
      </Box>
      <Box direction="row" pad="large" justify="center" align="center" gap="xlarge">
        <Box justify="center" pad="medium">
          <Image src={cogitoPortrait} width="200px" />
        </Box>
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
      <Footer />
    </UnresponsiveBox>
  );
};
