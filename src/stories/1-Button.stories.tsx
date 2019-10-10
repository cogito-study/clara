import { Button, Flex } from '@chakra-ui/core';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
};

export const text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const button = () => (
  <Flex flexDirection="column" alignItems="flex-start">
    <Button my={1} variantColor="red" rounded="none">
      Test Button
    </Button>
    <Button my={1} textTransform="lowercase" variantColor="teal" rounded="none" variant="outline">
      Test Button
    </Button>
    <Button my={1} variantColor="green" rounded="none" variant="ghost">
      Test Button
    </Button>
  </Flex>
);
