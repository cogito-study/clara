import React, { FunctionComponent, ChangeEvent } from 'react';
import { Box, Heading, TextInput, Button, Text, Image, CheckBox } from 'grommet';

import { Link } from './Link';
import { FormField } from './FormField';
import { Spinner } from './Spinner';
import { routePath } from '../../constants';
import profile from '../../assets/images/Profile.svg';

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
    responsive={false}
    width="500px"
    background="white"
    elevation="large"
    align="center"
    justify="center"
    round="medium"
    pad="medium"
    gap="xsmall"
  >
    <Heading level="1" margin="0px 0px 10px 0px" color="primary">
      {'Register'}
    </Heading>
    <Box direction="row-responsive">
      <Box align="center">
        <Image src={profile} width="100px" />
      </Box>
      <Box direction="column" justify="center" pad="medium">
        <Heading level="3" margin="none" color="nightBlue">
          {name}
        </Heading>
        <Text margin="none" color="primary">
          {email}
        </Text>
      </Box>
    </Box>
    <form onSubmit={onRegistration}>
      <Box margin="small">
        <Heading level="4" margin="0px 0px 0px 3px" color={'nightBlue'}>
          {'Password'}
        </Heading>

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
      <Box margin="small">
        <Heading level="4" margin="0px 0px 0px 3px" color={'nightBlue'}>
          {'Confirm password'}
        </Heading>
        <FormField flex="grow" basis="1" htmlFor="password-check" margin="none">
          <TextInput
            plain
            type="password"
            id="password-check"
            placeholder="repeat password"
            onChange={(event: ChangeEvent<HTMLInputElement>) => onPasswordCheckChange(event.target.value)}
          />
        </FormField>
      </Box>
      <Box align="center" margin="small">
        <CheckBox
          checked={isLegalCheckBoxChecked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onLegalCheckBoxChecked(event.target.checked)}
          label="Elfogadok mindent"
        />
      </Box>
    </form>
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
