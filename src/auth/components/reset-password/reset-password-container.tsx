import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { ResetPasswordCard } from '../ui/forgot-password/reset-password-card';

export const ResetPasswordContainer = () => {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token') || '';

  const onReset = (password: string, resetForm: () => void) => {
    resetPassword(password, token);
    resetForm();
  };

  return <ResetPasswordCard onReset={onReset} />;
};
