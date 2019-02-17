import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { routeBuilder } from '../../route/routeBuilder';
import { ResetDoneFeedbackCard } from '../../ui/components/ForgotPassword/FeedbackCard';

export const ResetDoneFeedbackContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  return <ResetDoneFeedbackCard onButtonClick={() => history.push(routeBuilder.login())} />;
};
