import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { useAuthRoute } from '../../hooks/use-auth-route';
import { ResetDoneFeedbackCard } from './reset-done-feedback';
import { ResetPasswordCard } from './reset-password-card';

export const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [hasResetPassword, setHasResetPassword] = useState<boolean>(false);
  const login = useAuthRoute({ path: 'login' });
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const token = params.get('token') || '';

  const onReset = (password: string, resetForm: () => void) => {
    resetPassword(password, token);
    resetForm();
    setHasResetPassword(true);
  };

  return hasResetPassword ? (
    <ResetDoneFeedbackCard onButtonClick={() => history.push(login)} />
  ) : (
    <ResetPasswordCard onReset={onReset} />
  );
};
