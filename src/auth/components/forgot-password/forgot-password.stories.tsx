import { action } from '@storybook/addon-actions';
import { Grommet } from 'grommet';
import React from 'react';
import { theme } from '../../grommet';
import { authComponents } from '../../utils/storybook';
import { EmailSentFeedbackCard } from './email-sent';
import { ForgotPasswordCard } from './forgot-password-card';
import { ForgotPasswordCardSent } from './forgot-password-done';

export default {
  title: authComponents('Forgot Password'),
  decorators: [(storyFn) => <Grommet theme={theme}>{storyFn()}</Grommet>],
};

export const emailSent = () => <EmailSentFeedbackCard />;

export const forgotPassword = () => (
  <ForgotPasswordCard onForgotPassword={action('on forgot password')} />
);

export const forgotPasswordSent = () => <ForgotPasswordCardSent />;
