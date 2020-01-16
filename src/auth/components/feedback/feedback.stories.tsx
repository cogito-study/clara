import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import React from 'react';
import { authComponents } from '../../utils/storybook';
import { Feedback } from './feedback';
import { FiCheckCircle } from 'react-icons/fi';
import { Icon, Box } from '@chakra-ui/core';

export default {
  title: authComponents('Feedback'),
};

export const withButton = () => (
  <Box maxW={400}>
    <Feedback
      title={text('Title', 'Feedback title')}
      icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
      description={text('Paragraph', 'We have successfully done something great.')}
      buttonLabel={text('Button label', 'feedback')}
      onButtonClick={action('feedback button clicked')}
    />
  </Box>
);

export const withoutButton = () => (
  <Box maxW={400}>
    <Feedback
      title={text('Title', 'Feedback title')}
      icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
      description={text('Paragraph', 'We have successfully done something great.')}
    />
  </Box>
);
