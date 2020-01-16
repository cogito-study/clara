import { Button } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { coreComponents } from '../../utils/storybook';
import { DeleteAlert } from './delete-alert';

export default {
  title: coreComponents('Alert'),
};

export const deleteAlert = () => {
  const Alert = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>trigger alert</Button>
        <DeleteAlert
          title="Are you sure want to delete this post?"
          description="You can't undo this action afterwards."
          isOpen={isOpen}
          isLoading={false}
          onClose={() => setOpen(false)}
          onDelete={action('delete')}
        />
      </>
    );
  };

  return <Alert />;
};

export const loadingDeleteAlert = () => {
  const Alert = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>trigger alert</Button>
        <DeleteAlert
          title="Are you sure want to delete this post?"
          description="You can't undo this action afterwards."
          isOpen={isOpen}
          isLoading
          onClose={() => setOpen(false)}
          onDelete={action('delete')}
        />
      </>
    );
  };

  return <Alert />;
};
