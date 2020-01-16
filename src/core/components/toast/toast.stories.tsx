import { text } from '@storybook/addon-knobs';
import React from 'react';
import { coreComponents } from '../../utils/storybook';
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from './toast';
import { useToast, Box, Button } from '@chakra-ui/core';

export default {
  title: coreComponents('Toast'),
};

export const info = () => {
  const Toaster = () => {
    const description = 'This notification contains any further information.';
    const toast = useToast();

    return (
      <Box>
        <Button
          onClick={() =>
            toast({
              position: 'top',
              render: (props) => <InfoToast description={description} {...props} />,
            })
          }
        >
          Show toast
        </Button>
        <InfoToast description={text('Description', description)} />
      </Box>
    );
  };

  return <Toaster />;
};

export const success = () => {
  const Toaster = () => {
    const description = 'This one gives positive feedback about an action.';
    const toast = useToast();

    return (
      <Box>
        <Button
          onClick={() =>
            toast({
              position: 'top',
              render: (props) => <SuccessToast description={description} {...props} />,
            })
          }
        >
          Show toast
        </Button>
        <SuccessToast description={text('Description', description)} />
      </Box>
    );
  };

  return <Toaster />;
};

export const error = () => {
  const Toaster = () => {
    const description = 'This one gives negative feedback about an action';
    const toast = useToast();

    return (
      <Box>
        <Button
          onClick={() =>
            toast({
              position: 'top',
              render: (props) => <ErrorToast description={description} {...props} />,
            })
          }
        >
          Show toast
        </Button>
        <ErrorToast description={text('Description', description)} />
      </Box>
    );
  };

  return <Toaster />;
};

export const warning = () => {
  const Toaster = () => {
    const description = 'This one gives warning feedback about an action';
    const toast = useToast();

    return (
      <Box>
        <Button
          onClick={() =>
            toast({
              position: 'top',
              render: (props) => <WarningToast description={description} {...props} />,
            })
          }
        >
          Show toast
        </Button>
        <WarningToast description={text('Description', description)} />
      </Box>
    );
  };

  return <Toaster />;
};
