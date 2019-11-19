import { Flex } from '@chakra-ui/core';
import React from 'react';
import { authComponents } from '../utils/storybook';
import { AuthLayout } from './auth-layout';

export default {
  title: authComponents('Layout'),
};

export const layout = () => (
  <AuthLayout>
    <Flex bg="green.300" fontSize="lg" align="center" justify="center">
      Router Placeholder
    </Flex>
  </AuthLayout>
);
