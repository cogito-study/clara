import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Heading, Image, Box } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';
import { Query } from 'react-apollo';

import cogitoPortrait from '../assets/images/cogito-portrait.svg';
import { Footer } from '../ui/components/Footer';
import { RegistrationCard } from '../ui/components/RegistrationCard';

const USER_INFO_QUERY = gql`
  query UserInfo($userID: Int!) {
    user(userId: $userID) {
      firstName
      lastName
      email
    }
  }
`;

export const RegisterContainer: FunctionComponent<RouteComponentProps<{ userID: string }>> = ({ match }) => {
  const onPasswordChange = (value: string) => console.log(value);

  const onPasswordCheckChange = (value: string) => console.log(value);
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
                return <div>Loading...</div>; // TODO: Change Loading animation
              }
              if (error) {
                return `Error!: ${error}`;
              }

              const { firstName, lastName, email } = data.user;
              return (
                <RegistrationCard
                  name={`${firstName} ${lastName}`}
                  email={email}
                  onPasswordChange={onPasswordChange}
                  onPasswordCheckChange={onPasswordCheckChange}
                />
              );
            }}
          </Query>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
