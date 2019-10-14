import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Grommet } from 'grommet';
import React from 'react';
import { theme } from '../../../grommet';
import { authComponents } from '../../../utils/storybook';
import { RegistrationCard } from './registration-card';

export default {
  title: authComponents('Register'),
  decorators: [(storyFn) => <Grommet theme={theme}>{storyFn()}</Grommet>],
};

export const registrationCard = () => (
  <RegistrationCard
    email={text('Email', 'example@email.com')}
    name={text('Name', 'Example Name')}
    isLoading={boolean('loading', false)}
    onRegistration={action('on registration')}
  />
);

export const loadingRegistrationCard = () => (
  <RegistrationCard
    email={text('Email', 'example@email.com')}
    name={text('Name', 'Example Name')}
    isLoading={boolean('Loading', true)}
    onRegistration={action('on registration')}
  />
);
