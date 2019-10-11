import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { ForgotPasswordCard } from '../ui/forgot-password/forgot-password-card';

export const ForgotPasswordContainer = () => {
  const { forgotPassword } = useAuth();

  const onForgotPassword = (email: string, resetForm: () => void) => {
    forgotPassword(email);
    resetForm();
  };

  return <ForgotPasswordCard onForgotPassword={onForgotPassword} />;
};
