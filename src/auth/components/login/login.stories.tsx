import { action } from '@storybook/addon-actions';
import { Grommet } from 'grommet';
import React from 'react';
import { theme } from '../../grommet';
import { authComponents } from '../../utils/storybook';
import { LoginCard } from './login-card';

export default {
  title: authComponents('Login'),
  decorators: [(storyFn) => <Grommet theme={theme}>{storyFn()}</Grommet>],
};

export const loginCard = () => <LoginCard isLoading={false} onLogin={action('on login')} />;

export const loadingLoginCard = () => <LoginCard isLoading onLogin={action('on login')} />;
