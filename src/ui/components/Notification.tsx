import { Box, Button, Image, Layer, Paragraph, Stack } from 'grommet';
import React, { FunctionComponent } from 'react';

import errorIcon from '../../assets/images/errorIcon.svg';
import infoIcon from '../../assets/images/infoIcon.svg';
import successIcon from '../../assets/images/successIcon.svg';

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
      <Layer
        style={{ minWidth: '310px', background: 'transparent' }}
        color="primary"
        responsive={false}
        position="top"
        modal={false}
        margin={{ top: 'large' }}
      >
        <Button plain onClick={onClose}>
          <Box
            round="small"
            elevation="medium"
            border={{ color: type, size: 'small' }}
            overflow="hidden"
            background="white"
            margin="small"
            width="275px"
          >
            <Stack anchor="right" guidingChild="last" fill>
              {renderNotificationIcon()}
              <Box pad="medium">
                <Paragraph size="small" textAlign="start" color={type} margin="none">
                  {message}
                </Paragraph>
              </Box>
            </Stack>
          </Box>
        </Button>
      </Layer>
    );
  }

  return null;
};
