import React, { FC, useState } from 'react';
import { AuthContext } from './auth-context';

export const MockAuthProvider: FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(`Login with email: ${email} and password: ${password}`);
    }, 2000);
  };

  const logout = () => {
    alert(`Successful logout`);
  };

  const activateUser = async (password: string, token: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(`Activate user with password: ${password} and token: ${token}`);
    }, 2000);
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(`Forgot password with email: ${email}`);
    }, 2000);
  };

  const resetPassword = async (password: string, token: string) => {
    setTimeout(() => {
      alert(`Reset password with new password: ${password} and token: ${token}`);
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        logout,
        activateUser,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
