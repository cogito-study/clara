import { Alert, AlertDescription, CloseButton, Icon, IToast } from '@chakra-ui/core';
import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

export type ToastProps = Pick<IToast, 'description' | 'status' | 'onClose'>;

export const InfoToast = ({ description, onClose }: ToastProps) => (
  <Alert status="info" variant="subtle" maxW="xs" py={4} mt={4} shadow="md">
    <Icon as={FiInfo} color="blue.700" size={8} />
    <AlertDescription ml={3} mr={5} color="blue.900" textAlign="left">
      {description}
    </AlertDescription>
    <CloseButton
      color="blue.700"
      position="absolute"
      right={1}
      top={1}
      borderRadius={0}
      onClick={onClose}
    />
  </Alert>
);

export const SuccessToast = ({ description, onClose }: ToastProps) => (
  <Alert status="success" variant="subtle" maxW="xs" py={4} mt={4} shadow="md">
    <Icon as={FiCheckCircle} color="green.700" size={8} />
    <AlertDescription ml={3} mr={5} color="green.900" textAlign="left">
      {description}
    </AlertDescription>
    <CloseButton
      color="green.700"
      position="absolute"
      right={1}
      top={1}
      borderRadius={0}
      onClick={onClose}
    />
  </Alert>
);

export const ErrorToast = ({ description, onClose }: ToastProps) => (
  <Alert status="error" variant="subtle" maxW="xs" py={4} mt={4} shadow="md">
    <Icon as={FiXCircle} size={8} color="red.700" />
    <AlertDescription ml={3} mr={5} color="red.900" textAlign="left">
      {description}
    </AlertDescription>
    <CloseButton
      color="red.700"
      position="absolute"
      right={1}
      top={1}
      borderRadius={0}
      onClick={onClose}
    />
  </Alert>
);

export const WarningToast = ({ description, onClose }: ToastProps) => (
  <Alert status="warning" variant="subtle" maxW="xs" py={4} mt={4} shadow="md">
    <Icon as={FiAlertCircle} size={8} color="orange.700" />
    <AlertDescription ml={3} mr={5} color="orange.900" textAlign="left">
      {description}
    </AlertDescription>
    <CloseButton
      color="orange.700"
      position="absolute"
      right={1}
      top={1}
      borderRadius={0}
      onClick={onClose}
    />
  </Alert>
);
