import React, { FunctionComponent, useState } from 'react';
import { Layer, LayerProps, Box, Text, Button } from 'grommet';
import { FormClose } from 'grommet-icons';

interface Props {
  message?: string;
  type?: 'error' | 'ok';
}

export const Notification: FunctionComponent<LayerProps & Props> = ({ type, message, ...rest }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (isOpen) {
    return (
      <Layer plain position="top" modal onEsc={() => setIsOpen(false)} {...rest}>
        <Box align="start" pad={{ vertical: 'medium', horizontal: 'small' }}>
          <Box
            align="center"
            direction="row"
            gap="small"
            round="medium"
            elevation="medium"
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
            background={'status-' + type}
          >
            <Box align="center" direction="row" gap="xsmall">
              <Text>{message}</Text>
            </Box>
            <Button icon={<FormClose />} onClick={() => setIsOpen(false)} plain />
          </Box>
        </Box>
      </Layer>
    );
  }

  return null;
};
