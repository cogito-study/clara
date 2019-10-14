import React from 'react';
import { subjectComponents } from '../utils/storybook';
import { SubjectLayout } from './subject-layout';

export default {
  title: subjectComponents('Layout'),
};

export const layout = () => <SubjectLayout />;
