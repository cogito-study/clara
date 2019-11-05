import React from 'react';
import { subjectComponents } from '../../utils/storybook';
import { InfoCard, InfoCardProps } from './info-card';
import { NoteCard, NoteCardProps } from './note-card';
import { TeacherCard, TeacherCardProps } from './teacher-card';
import { InfoTitle } from './info-title';

export default {
  title: subjectComponents('Elements'),
};

const noteCardProps: NoteCardProps = {
  title: 'Vascular surgery longer longer',
  order: 12,
  updation: 'updated 5 days ago',
  description: 'alpha, beta, gamma, delta, omega, epsilon, gamma, kappa, tau',
};

const infoCardProps: InfoCardProps = {
  title: 'Vascular surgery longer longer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
};

const teacherCardProps: TeacherCardProps = {
  name: 'Dr. Guy Smith',
  title: 'adjunct professor',
  email: 'guy.smith@university.edu',
};

export const noteCard = () => <NoteCard {...noteCardProps} />;
export const infoCard = () => <InfoCard {...infoCardProps} />;
export const infoCardWithGeneralInfos = () => (
  <InfoCard {...infoCardProps} code="NEPTUN" department="Vascular surgery department" />
);
export const teacherCard = () => <TeacherCard {...teacherCardProps} />;
export const infoTitle = () => <InfoTitle title="Teachers" />;
