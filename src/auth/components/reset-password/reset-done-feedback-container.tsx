import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { routeBuilder } from '../../../core/route/route-builder';
import { ResetDoneFeedbackCard } from '../ui/forgot-password/feedback-card';

export const ResetDoneFeedbackContainer: FunctionComponent<RouteComponentProps> = ({ history }) => {
  return <ResetDoneFeedbackCard onButtonClick={() => history.push(routeBuilder.login())} />;
};
