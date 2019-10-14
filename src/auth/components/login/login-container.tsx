import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { LoginCard } from '../ui/login/login-card';

export const LoginContainer = () => {
  const { login, isLoading } = useAuth();

  const onLogin = (email: string, password: string, resetForm: () => void) => {
    login(email, password);
    resetForm();
  };

  return <LoginCard onLogin={onLogin} isLoading={isLoading} />;
};
