import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Heading, TextInput, Button } from 'grommet';
import { FormField } from './FormField';

interface Props {
  name: string;
  email: string;
}

const RegistrationCard: FunctionComponent<BoxProps & Props> = (props) => (
  <Box width="large" background="light" elevation="small" align="center" round="medium" pad="medium" gap="small">
    <Heading level="2" margin="none">
      {props.name}
    </Heading>
    <Heading level="4" margin="none">
      {props.email}
    </Heading>
    <FormField flex="grow" basis="1" htmlFor="email-input" margin="none">
      <TextInput plain id="password" placeholder="pw" size="medium" />
    </FormField>
    <FormField flex="grow" basis="1" htmlFor="email-input" margin="none">
      <TextInput plain id="password-chack" placeholder="pwcheck" size="medium" />
    </FormField>
    <Button primary label="Registration" onClick={() => alert('Rakatintottal a gombra!')} />
  </Box>
);

export { RegistrationCard };
