import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { LoginCard } from './login-card';

export const Login = () => {
  const { login, isLoading } = useAuth();

  const onLogin = (email: string, password: string, resetForm: () => void) => {
    login(email, password);
    resetForm();
  };

  return <LoginCard onLogin={onLogin} isLoading={isLoading} />;
};
