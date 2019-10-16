import React, { useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { ForgotPasswordCard } from './forgot-password-card';
import { ForgotPasswordCardSent } from './forgot-password-done';

export const ForgotPassword = () => {
  const [hasForgotPassword, setHasForgotPassword] = useState<boolean>(false);
  const { forgotPassword } = useAuth();

  const onForgotPassword = (email: string, resetForm: () => void) => {
    forgotPassword(email);
    resetForm();
    setHasForgotPassword(true);
  };

  return hasForgotPassword ? (
    <ForgotPasswordCardSent />
  ) : (
    <ForgotPasswordCard onForgotPassword={onForgotPassword} />
  );
};
