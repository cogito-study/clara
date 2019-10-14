import { Grommet } from 'grommet';
import React from 'react';
import { theme } from '../grommet';
import { authComponents } from '../utils/storybook';
import { AuthLayout } from './auth-layout';

export default {
  title: authComponents('Layout'),
  decorators: [(storyFn) => <Grommet theme={theme}>{storyFn()}</Grommet>],
};

export const layout = () => <AuthLayout />;
