import * as React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { FormField } from './components/FormField';

export const GrommetComponents = () => {
  return (
    <Box align="center" gap="medium" fill="true">
      <Button primary label="Main Button" onClick={() => alert('Rakatintottal a gombra!')} />
      <FormField flex="grow" basis="1" label="Email" htmlFor="email-input">
        <TextInput plain id="email-input" placeholder="iLoveLearning@somuch.com" size="medium" />
      </FormField>
    </Box>
  );
};

export default GrommetComponents;
