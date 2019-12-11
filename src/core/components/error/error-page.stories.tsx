import React from 'react';
import { coreComponents } from '../../utils/storybook';
import { ErrorPage } from './error-page';

export default {
  title: coreComponents('Error'),
};

export const errorPage = () => <ErrorPage />;
