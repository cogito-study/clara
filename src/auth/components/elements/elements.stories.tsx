import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { Grommet } from 'grommet';
import React from 'react';
import checkCircle from '../../../core/assets/images/checkCircle.svg';
import { theme } from '../../grommet';
import { authComponents } from '../../utils/storybook';
import { FeedbackCard } from './feedback-card';
import { ExpiredFeedbackCard } from './link-expired';

export default {
  title: authComponents('Elements'),
  decorators: [(storyFn) => <Grommet theme={theme}>{storyFn()}</Grommet>],
};

export const feedbackCard = () => (
  <FeedbackCard
    title={text('Title', 'Feedback title')}
    icon={checkCircle}
    paragraph={text('Paragraph', 'We have successfully done something great.')}
    buttonLabel={text('Button label', 'feedback')}
    onButtonClick={action('feedback button clicked')}
  />
);

export const expiredLink = () => <ExpiredFeedbackCard />;
