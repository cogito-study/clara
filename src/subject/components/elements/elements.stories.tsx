import { Button } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { subjectComponents } from '../../utils/storybook';
import { AddItemCard } from './add-item-card';
import { MoreMenu } from './more-menu';
export default {
  title: subjectComponents('Elements'),
};

export const addNewNote = () => <AddItemCard title="add new note" onClick={action('Add note')} />;

export const addNewInfo = () => (
  <AddItemCard title="add new information" onClick={action('Add info')} h={196} />
);

export const moreMenu = () => <MoreMenu isEditable isDeletable />;

export const moreMenuWithCustomTrigger = () => (
  <MoreMenu
    isDeletable
    trigger={
      <Button
        aria-label=""
        bg="transparent"
        size="md"
        variant="outline"
        color="blue.800"
        borderColor="teal.500"
        borderRadius="none"
      >
        this is a custom button with only delete
      </Button>
    }
  ></MoreMenu>
);
