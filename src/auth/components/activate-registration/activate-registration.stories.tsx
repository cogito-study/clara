import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import { authComponents } from '../../utils/storybook';
import { institutesMock } from './graphql/institutes-by-token-query.mock';
import { majorMock } from './graphql/major-by-token.mock';
import { PickStudies } from './pick-studies';
import { PickSubjects } from './pick-subjects';

export default {
  title: authComponents('Activate Registration'),
  decorators: [
    (storyFn) => (
      <MockedProvider mocks={[institutesMock, majorMock]} addTypename={false}>
        {storyFn()}
      </MockedProvider>
    ),
    StoryRouter({}),
  ],
};

export const pickStudies = () => (
  <Box maxW={400}>
    <PickStudies onFormSubmit={action('Submitted form')} token="asdf123" />
  </Box>
);

export const pickSubjects = () => (
  <Box maxW={400}>
    <PickSubjects
      onSave={action('Save form')}
      majorID="asdf"
      token="asdf123"
      isSubmitting={false}
    />
  </Box>
);
