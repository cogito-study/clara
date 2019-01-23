import { Box, BoxProps, Heading, Button, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

interface Props {
  question: string;
  details?: string | null;
  cancelButton: string;
  acceptButton: string;
}

export const PopUpCard: FunctionComponent<BoxProps & Props> = (props) => (
  <Box
    pad={{ horizontal: 'large', vertical: 'medium' }}
    background="white"
    round="medium"
    elevation="large"
    width="large"
  >
    <Heading level="3" margin="none">
      {props.question}
    </Heading>
    {props.details && <Paragraph margin={{ vertical: 'small' }}>{props.details}</Paragraph>}
    <Box direction="row" gap="medium" justify="end">
      <Button color="primary_light_1" label={props.cancelButton} />
      <Button primary label={props.acceptButton} />
    </Box>
  </Box>
);
