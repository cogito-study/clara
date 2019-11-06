import React from 'react';
import { subjectComponents } from '../../utils/storybook';
import { SubjectNoteCard, SubjectNoteCardProps } from './subject-note-card';

export default {
  title: subjectComponents('Notes'),
};

const noteCardProps: SubjectNoteCardProps = {
  title: 'Vascular surgery longer longer',
  number: 12,
  updatedAt: new Date(),
  description: 'alpha, beta, gamma, delta, omega, epsilon, gamma, kappa, tau',
};

export const noteCard = () => <SubjectNoteCard {...noteCardProps} />;
