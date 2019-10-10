import { Box, Heading, Image, Text } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Link } from '../../../../core/components/link';
import { routeBuilder } from '../../../../core/route/route-builder';
import profile from '../../../../core/assets/images/Profile.svg';
import { RegistrationForm, RegistrationFormProps } from './registration-form';

interface RegistrationCardProps extends RegistrationFormProps {
  name: string;
  email: string;
}

export const RegistrationCard: FunctionComponent<RegistrationCardProps> = ({ name, email, onRegistration }) => (
  <Box
    width="large"
    background="white"
    elevation="large"
    align="center"
    justify="center"
    round="medium"
    pad={{ horizontal: 'large', top: 'large', bottom: 'medium' }}
    margin="small"
    gap="none"
  >
    <Heading level="2" margin={{ bottom: 'medium', top: 'none' }} color="primary">
      Regisztráció
    </Heading>
    <Box direction="row" align="center">
      <Box align="center">
        <Image src={profile} width="70px" />
      </Box>
      <Box direction="column" justify="center" pad={{ left: 'medium', vertical: 'small' }}>
        <Heading textAlign="start" level="4" margin="none" color="primary_dark_2">
          {name}
        </Heading>
        <Text textAlign="start" margin="none" size="small" color="primary">
          {email}
        </Text>
      </Box>
    </Box>
    <Box margin={{ top: 'medium' }} pad={{ horizontal: 'medium' }} fill align="center">
      <RegistrationForm onRegistration={onRegistration} />
      <Text size="small" margin="xsmall">
        Már van profilod? <Link to={routeBuilder.login()}>Bejelentkezés</Link>
      </Text>
    </Box>
  </Box>
);
