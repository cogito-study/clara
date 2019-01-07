import { Box, Heading, Image, Text } from 'grommet';
import React, { FunctionComponent } from 'react';

import profile from '../../../assets/images/Profile.svg';
import { routePath } from '../../../constants';
import { Link } from '../Link';
import { RegistrationForm, RegistrationFormProps } from './RegistrationForm';

interface RegistrationCardProps extends RegistrationFormProps {
  name: string;
  email: string;
}

export const RegistrationCard: FunctionComponent<RegistrationCardProps> = ({ name, email, onRegistration }) => (
  <Box
    width="large"
    background="white"
    elevation="xlarge"
    align="center"
    justify="center"
    round="medium"
    pad={{ horizontal: 'medium', vertical: 'medium' }}
    margin="small"
    gap="none"
  >
    <Heading level="2" margin={{ bottom: 'small', top: 'none' }} color="primary">
      {'Regisztráció'}
    </Heading>
    <Box direction="row-responsive" align="center">
      <Box align="center">
        <Image src={profile} width="80px" />
      </Box>
      <Box direction="column" justify="center" pad={{ horizontal: 'medium', vertical: 'small' }}>
        <Heading textAlign="center" level="3" margin="none" color="nightBlue">
          {name}
        </Heading>
        <Text textAlign="center" margin="none" size="small" color="primary">
          {email}
        </Text>
      </Box>
    </Box>
    <Box margin={{ vertical: 'small' }} fill align="center">
      <RegistrationForm onRegistration={onRegistration} />
      <Text size="small" margin="xsmall">
        Már van profilod? <Link to={routePath.root()}>Bejelentkezés</Link>
      </Text>
    </Box>
  </Box>
);
