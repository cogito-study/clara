import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Heading, Image, Box } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { routePath } from '../constants/routePath';
import cogitoPortrait from '../assets/images/cogito-portrait.svg';
import { Footer, RegistrationCard } from '../ui/components';

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
      success
    }
  }
`;

export const RegisterContainer: FunctionComponent<RouteComponentProps<{ userID: string }>> = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { userID } = match.params;
  const { data } = useQuery(USER_INFO_QUERY, { variables: { userID } });
  const registerPassword = useMutation(ACTIVATE_USER, { variables: { userID, password } });

  const onRegistration = () => {
    setLoading(true);
    registerPassword().then(() => {
      setLoading(false);
      history.push(routePath.subjectNotes);
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
              name={`${data.user.firstName} ${data.user.lastName}`}
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
