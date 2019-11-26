import { Button } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { subjectComponents } from '../../utils/storybook';
import { SubjectNoteCard, SubjectNoteCardFooter, SubjectNoteCardProps } from './subject-note-card';

export default {
  title: subjectComponents('Notes'),
};

const noteCardProps: SubjectNoteCardProps = {
  id: 'asdfasdf',
  title: 'Vascular surgery longer longer',
  number: 12,
  updatedAt: new Date(),
  description: 'alpha, beta, gamma, delta, omega, epsilon, gamma, kappa, tau',
};

export const noteCard = () => <SubjectNoteCard {...noteCardProps} />;

export const withDelete = () => (
  <SubjectNoteCard {...noteCardProps}>
    <SubjectNoteCardFooter>
      <Button
        variant="outline"
        variantColor="red"
        size="sm"
        onClick={action('delete clicked')}
        borderRadius={0}
        borderWidth={2}
      >
        delete
      </Button>
    </SubjectNoteCardFooter>
  </SubjectNoteCard>
);

export const withEdit = () => (
  <SubjectNoteCard {...noteCardProps}>
    <SubjectNoteCardFooter>
      <Button
        variant="outline"
        variantColor="teal"
        color="blue.700"
        borderColor="teal.500"
        size="sm"
        borderRadius={0}
        borderWidth={2}
        onClick={action('edit clicked')}
      >
        edit
      </Button>
    </SubjectNoteCardFooter>
  </SubjectNoteCard>
);

export const WithDeleteAndEdit = () => (
  <SubjectNoteCard {...noteCardProps}>
    <SubjectNoteCardFooter>
      <Button
        variant="outline"
        variantColor="teal"
        color="blue.700"
        borderColor="teal.500"
        size="sm"
        borderRadius={0}
        borderWidth={2}
        onClick={action('edit clicked')}
      >
        edit
      </Button>
      <Button
        variant="outline"
        variantColor="red"
        size="sm"
        borderRadius={0}
        borderWidth={2}
        ml={1}
        onClick={action('delete clicked')}
      >
        delete
      </Button>
    </SubjectNoteCardFooter>
  </SubjectNoteCard>
);
