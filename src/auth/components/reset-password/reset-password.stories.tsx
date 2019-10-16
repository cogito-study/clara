import { action } from '@storybook/addon-actions';
import { Grommet } from 'grommet';
import React from 'react';
import { theme } from '../../grommet';
import { authComponents } from '../../utils/storybook';
import { ResetDoneFeedbackCard } from './reset-done-feedback';
import { ResetPasswordCard } from './reset-password-card';

export default {
  title: authComponents('Reset Password'),
  decorators: [(storyFn) => <Grommet theme={theme}>{storyFn()}</Grommet>],
};

export const resetPassword = () => <ResetPasswordCard onReset={action('on reset')} />;

export const resetPasswordDone = () => (
  <ResetDoneFeedbackCard onButtonClick={action('on reset done')} />
);
