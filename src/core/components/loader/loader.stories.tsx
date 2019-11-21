import React from 'react';
import { coreComponents } from '../../utils/storybook';
import { CogitoLoader, FullCogitoLoader } from './cogito-loader';

export default {
  title: coreComponents('Loader'),
};

export const cogito = () => <CogitoLoader />;

export const fullCogito = () => <FullCogitoLoader />;
