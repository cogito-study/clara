import React, { FunctionComponent, useState } from 'react';
import { Layer, LayerProps, Box, Text, Button } from 'grommet';
import { FormClose } from 'grommet-icons';

export enum NotificationType {
  Error = 'error',
  Success = 'success',
  Info = 'info',
}
interface Props {
  message?: string;
  type?: NotificationType;
}

export const Notification: FunctionComponent<LayerProps & Props> = ({ type, message, ...rest }) => {
  const [isOpen, setIsOpen] = useState(true);

  let background = '#FF2B5E';

  switch (type) {
    case 'ok':
      background = '#24EE81';
      break;
    case 'info':
      background = '#4787D3';
  }

  if (isOpen) {
    return (
      <Layer plain position="top" modal={false} onEsc={() => setIsOpen(false)} {...rest}>
        <Box align="start" round="small" height="120px" elevation="small">
          <Box align="center" direction="row" round="small" elevation="none" height="120px" background={background}>
            <Box
              height="120px"
              align="center"
              direction="row"
              background="white"
              round={{ corner: 'left', size: 'small' }}
              pad="medium"
            >
              <Text color={background}>{message}</Text>
            </Box>
            <Button icon={<FormClose />} onClick={() => setIsOpen(false)} plain />
          </Box>
        </Box>
      </Layer>
    );
  }

  return null;
};
