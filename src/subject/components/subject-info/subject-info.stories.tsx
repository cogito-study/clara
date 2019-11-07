import React from 'react';
import { subjectComponents } from '../../utils/storybook';
import { SubjectInfoCard, SubjectInfoCardProps } from './subject-info-card';
import { SubjectTeacherCard, SubjectTeacherCardProps } from './subject-teacher-card';

export default {
  title: subjectComponents('Info'),
};

const infoCardProps: SubjectInfoCardProps = {
  title: 'Vascular surgery longer longer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
};

const teacherCardProps: SubjectTeacherCardProps = {
  name: 'Dr. Guy Smith',
  title: 'adjunct professor',
  email: 'guy.smith@university.edu',
};

export const infoCard = () => <SubjectInfoCard {...infoCardProps} />;
export const infoCardWithGeneralInfos = () => (
  <SubjectInfoCard {...infoCardProps} code="NEPTUN" department="Vascular surgery department" />
);
export const teacherCard = () => <SubjectTeacherCard {...teacherCardProps} />;
