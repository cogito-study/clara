import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { authRoute } from '../../utils/auth-route';
import { ResetDoneFeedbackCard } from './reset-done-feedback';
import { ResetPasswordCard } from './reset-password-card';

export const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [hasResetPassword, setHasResetPassword] = useState<boolean>(false);
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
    <ResetDoneFeedbackCard onButtonClick={() => history.push(authRoute({ path: 'login' }))} />
  ) : (
    <ResetPasswordCard onReset={onReset} />
  );
};
