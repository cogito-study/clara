import React, { FunctionComponent, ChangeEvent } from 'react';
import { Box, BoxProps, Heading, TextInput, Button, Text } from 'grommet';
import { FormField } from './FormField';
import { Spinner } from './Spinner';

interface Props {
  name: string;
  email: string;
  isRegistrationDisabled: boolean;
  isLoading: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordCheckChange: (value: string) => void;
  onRegistration?: () => void;
}

const RegistrationCard: FunctionComponent<BoxProps & Props> = ({
  name,
  email,
  isRegistrationDisabled,
  isLoading,
  onPasswordChange,
  onPasswordCheckChange,
  onRegistration,
}) => (
  <Box
    width="500px"
    height="500px"
    background="white"
    elevation="medium"
    align="center"
    justify="center"
    round="medium"
    pad="small"
    gap="small"
  >
    <Heading level="1" margin="none" color="primary">
      {'Register'}
    </Heading>
    <Heading level="3" margin="none" color="nightBlue">
      {name}
    </Heading>
    <Text margin="none" color="primary">
      {email}
    </Text>
    <Box margin="20px 0px 0px 0px">
      <Heading level="4" margin="0px 0px 0px 3px" color={'primary'}>
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
    <Box>
      <Heading level="4" margin="0px 0px 0px 3px" color={'primary'}>
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
    {isLoading ? (
      <Spinner primary />
    ) : (
      <Button
        primary
        margin="20px 0px 0px 0px"
        disabled={isRegistrationDisabled}
        label="Registration"
        onClick={onRegistration}
      />
    )}
    <Text margin="none">{'Already have an account? Login'}</Text>
  </Box>
);

export { RegistrationCard };
