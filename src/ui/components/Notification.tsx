import React, { FunctionComponent } from 'react';
import { Layer, Box, Button, Paragraph, Image } from 'grommet';

import errorIcon from '../../assets/images/errorIcon.svg';
import successIcon from '../../assets/images/successIcon.svg';
import infoIcon from '../../assets/images/infoIcon.svg';

export type NotificationType = 'error' | 'success' | 'info';
export interface NotificationProps {
  isOpen: boolean;
  message?: string;
  type?: NotificationType;
  onClose: () => void;
}

export const Notification: FunctionComponent<NotificationProps> = ({ isOpen, type, message, onClose }) => {
  const renderNotificationIcon = () => {
    switch (type) {
      case 'error':
        return <Image src={errorIcon} />;

      case 'success':
        return <Image src={successIcon} />;

      case 'info':
        return <Image src={infoIcon} />;

      default:
        return;
    }
  };

  if (isOpen) {
    return (
      <Layer plain position="bottom" modal={false}>
        <Button plain onClick={onClose}>
          <Box round="small" elevation="small" overflow="hidden" direction="row" margin="small">
            <Box align="center" direction="row" background="white" pad="medium" margin="none">
              <Paragraph size="small" textAlign="start" color={type} margin="none">
                {message}
              </Paragraph>
            </Box>
            <Box width="40px" align="center" justify="center" pad="small" background={type}>
              {renderNotificationIcon()}
            </Box>
          </Box>
        </Button>
      </Layer>
    );
  }

  return null;
};
