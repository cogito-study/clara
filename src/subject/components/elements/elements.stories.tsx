import React from 'react';
import { subjectComponents } from '../../utils/storybook';
import { NoteCard, NoteCardProps } from './note-card';

export default {
  title: subjectComponents('Elements'),
};

const noteCardProps: NoteCardProps = {
  title: 'Vascular surgery longer longer',
  order: 12,
  updation: 'updated 5 days ago',
  description: 'alpha, beta, gamma, delta, omega, epsilon, gamma, kappa, tau',
};

export const noteCard = () => <NoteCard {...noteCardProps} />;
