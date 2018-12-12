import React, { FunctionComponent, ChangeEvent } from 'react';
import { Box, BoxProps, Heading, TextInput, Button } from 'grommet';
import { FormField } from './FormField';

interface Props {
  name: string;
  email: string;
  isRegistrationDisabled: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordCheckChange: (value: string) => void;
  onRegistration?: () => void;
}

const RegistrationCard: FunctionComponent<BoxProps & Props> = ({
  name,
  email,
  isRegistrationDisabled,
  onPasswordChange,
  onPasswordCheckChange,
  onRegistration,
}) => (
  <Box
    width="large"
    height="medium"
    background="light"
    elevation="medium"
    align="center"
    justify="center"
    round="medium"
    pad="medium"
    gap="medium"
  >
    <Heading level="2" margin="none">
      {name}
    </Heading>
    <Heading level="4" margin="none">
      {email}
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
    <FormField flex="grow" basis="1" htmlFor="password-check" margin="none">
      <TextInput
        plain
        type="password"
        id="password-check"
        placeholder="repeat password"
        onChange={(event: ChangeEvent<HTMLInputElement>) => onPasswordCheckChange(event.target.value)}
      />
    </FormField>
    <Button primary disabled={isRegistrationDisabled} label="Registration" onClick={onRegistration} />
  </Box>
);

export { RegistrationCard };
