import React, { FunctionComponent } from 'react';
import { Layer, Box, Button, Paragraph, Image } from 'grommet';

import errorIcon from '../../assets/images/errorIcon.svg';
import successIcon from '../../assets/images/successIcon.svg';
import infoIcon from '../../assets/images/infoIcon.svg';

export enum NotificationType {
  Error = 'error',
  Success = 'success',
  Info = 'info',
}
export interface NotificationProps {
  isOpen: boolean;
  message?: string;
  type?: NotificationType;
  onClose: () => void;
}

export const Notification: FunctionComponent<NotificationProps> = ({ isOpen, type, message, onClose }) => {
  const renderNotificationIcon = () => {
    switch (type) {
      case NotificationType.Error:
        return <Image src={errorIcon} />;

      case NotificationType.Success:
        return <Image src={successIcon} />;

      case NotificationType.Info:
        return <Image src={infoIcon} />;

      default:
        return;
    }
  };

  if (isOpen) {
    return (
      <Layer position="bottom" modal={false}>
        <Button plain onClick={onClose}>
          <Box pad="xsmall">
            <Box round="small" elevation="small" overflow="hidden" direction="row">
              <Box align="center" direction="row" background="white" pad="medium" margin="none">
                <Paragraph size="small" textAlign="start" color={type} margin="none">
                  {message}
                </Paragraph>
              </Box>
              <Box width="40px" align="center" justify="center" pad="small" background={type}>
                {renderNotificationIcon()}
              </Box>
            </Box>
          </Box>
        </Button>
      </Layer>
    );
  }

  return null;
};
