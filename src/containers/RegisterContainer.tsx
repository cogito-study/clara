import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Heading, Image, Box } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import { routePath } from '../constants/routePath';
import cogitoPortrait from '../assets/images/cogito-portrait.svg';
import { Footer, RegistrationCard, Spinner } from '../ui/components';

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
  const { userID } = match.params;

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
          <Query query={USER_INFO_QUERY} variables={{ userID }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner primary={false} />;
              }
              if (error) {
                return `Error!: ${error}`; // TODO: Handle error
              }

              const { firstName, lastName, email } = data.user;
              return (
                <Mutation
                  mutation={ACTIVATE_USER}
                  variables={{ userID, password }}
                  onCompleted={() => history.push(routePath.subjectNotes)}
                >
                  {(registerPassword, { loading: mutationLoading }) => {
                    return (
                      <RegistrationCard
                        name={`${firstName} ${lastName}`}
                        email={email}
                        isRegistrationDisabled={password !== passwordCheck}
                        isLoading={mutationLoading}
                        onPasswordChange={setPassword}
                        onPasswordCheckChange={setPasswordCheck}
                        onRegistration={registerPassword}
                      />
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
