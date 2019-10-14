import React from 'react';
import { subjectComponents } from '../../utils/storybook';
import { Placeholder } from './placeholder';

export default {
  title: subjectComponents('Elements'),
};

export const placeholder = () => <Placeholder />;
