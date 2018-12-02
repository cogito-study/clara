import * as React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { FormField } from './components/FormField';
import { NoteCard } from './components/NoteCard';

const noteCardTitle = 'Origin of heart murmurs. Diastolic murmurs.';
const noteCardAbstract =
  'Létfontos szerv: bőr és nyálkahártya nélkül nincs élet (ld. súlyos égést követő állapotok, Lyell szindróma)!';

export const GrommetComponents = () => {
  return (
    <Box align="center" gap="medium" fill="true" background="#FBFDFF">
      <Button primary label="Main Button" onClick={() => alert('Rakatintottal a gombra!')} />
      <FormField flex="grow" basis="1" htmlFor="email-input" margin="none">
        <TextInput plain id="email-input" placeholder="iLoveLearning@somuch.com" size="medium" />
      </FormField>
      <NoteCard title={noteCardTitle} abstract={noteCardAbstract} />
    </Box>
  );
};

export default GrommetComponents;
