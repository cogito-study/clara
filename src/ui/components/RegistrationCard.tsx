import { Box, Button, CheckBox, Heading, Image, Text, TextInput } from 'grommet';
import React, { ChangeEvent, FunctionComponent } from 'react';

import profile from '../../assets/images/Profile.svg';
import { routePath } from '../../constants';
import { FormField } from './FormField';
import { Link } from './Link';
import { Spinner } from './Spinner';

interface Props {
  name: string;
  email: string;
  isRegistrationDisabled: boolean;
  isLoading: boolean;
  isLegalCheckBoxChecked: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordCheckChange: (value: string) => void;
  onLegalCheckBoxChecked: (enabled: boolean) => void;
  onRegistration?: () => void;
}

export const RegistrationCard: FunctionComponent<Props> = ({
  name,
  email,
  isRegistrationDisabled,
  isLoading,
  isLegalCheckBoxChecked,
  onPasswordChange,
  onPasswordCheckChange,
  onLegalCheckBoxChecked,
  onRegistration,
}) => (
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
      {'Register'}
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
    <Box margin={{ vertical: 'small' }} fill>
      <form onSubmit={onRegistration}>
        <Box margin={{ horizontal: 'large', vertical: 'small' }}>
          <Text size="16px" weight="bold" margin="0px 0px 0px 3px" color={'nightBlue'}>
            {'Password'}
          </Text>

          <FormField flex="grow" basis="1" htmlFor="password" margin="none">
            <TextInput
              plain
              type="password"
              id="password"
              placeholder="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) => onPasswordChange(event.target.value)}
            />
          </FormField>
        </Box>
        <Box margin={{ horizontal: 'large', vertical: 'small' }}>
          <Text size="16px" weight="bold" margin="0px 0px 0px 3px" color={'nightBlue'}>
            {'Confirm password'}
          </Text>
          <FormField htmlFor="password-check" margin="none">
            <TextInput
              plain
              type="password"
              id="password-check"
              placeholder="repeat password"
              onChange={(event: ChangeEvent<HTMLInputElement>) => onPasswordCheckChange(event.target.value)}
            />
          </FormField>
        </Box>
        <Box align="center" margin={{ top: 'medium' }}>
          <CheckBox
            checked={isLegalCheckBoxChecked}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onLegalCheckBoxChecked(event.target.checked)}
            label="Elfogadok mindent"
          />
        </Box>
      </form>
    </Box>
    {isLoading ? (
      <Spinner primary />
    ) : (
      <Button primary disabled={isRegistrationDisabled} label="Registration" onClick={onRegistration} margin="xsmall" />
    )}
    <Text size="small" margin="xsmall">
      Already have an account? <Link to={routePath.root()}>Login</Link>
    </Text>
  </Box>
);
