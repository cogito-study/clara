import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthRoute } from '../../hooks/use-auth-route';
import { ResetDoneFeedbackCard } from '../ui/forgot-password/feedback-card';

export const ResetDoneFeedbackContainer = () => {
  const history = useHistory();
  const login = useAuthRoute({ path: 'login' });
  return <ResetDoneFeedbackCard onButtonClick={() => history.push(login)} />;
};
