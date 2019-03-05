import { Box, BoxProps, Button, Heading, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

interface PopUpCardProps {
  question: string;
  details?: string | null;
  cancelButton: string;
  acceptButton: string;
  onCancel: () => void;
  onAccept: () => void;
}

export const PopUpCard: FunctionComponent<BoxProps & PopUpCardProps> = ({
  question,
  details,
  cancelButton,
  acceptButton,
  onAccept,
  onCancel,
}) => (
  <Box
    pad={{ horizontal: 'large', vertical: 'medium' }}
    background="white"
    round="medium"
    elevation="large"
    width="large"
  >
    <Heading level="3" margin="none">
      {question}
    </Heading>
    {details && <Paragraph margin={{ vertical: 'small' }}>{details}</Paragraph>}
    <Box direction="row" gap="medium" justify="end">
      <Button color="primary_light_1" label={cancelButton} onClick={onCancel} />
      <Button primary label={acceptButton} onClick={onAccept} />
    </Box>
  </Box>
);
