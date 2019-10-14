import { useApolloClient } from '@apollo/react-hooks';
import React, { createContext, FC, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocalStorage } from 'web-api-hooks';
import { useGraphQLErrorNotification } from '../../core/hooks/use-graphql-error-notification';
import { useSubjectRoute } from '../../subject/hooks/use-subject-route';
import { useAuthRoute } from '../hooks/use-auth-route';
import { useActivateUserMutation } from './graphql/activate-user-mutation.generated';
import { useForgotPasswordMutation } from './graphql/forgot-password-mutation.generated';
import { useLoginUserMutation } from './graphql/login-user-mutation.generated';
import { useResetPasswordMutation } from './graphql/reset-password-mutation.generated';
import { UserInfoFragment } from './graphql/user-info-fragment.generated';

interface AuthContextType {
  user?: UserInfoFragment;
  authToken?: string;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  activateUser: (password: string, token: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  login: () => {},
  logout: () => {},
  activateUser: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
});

const authTokenKey = 'AUTH_TOKEN';

export const AuthProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfoFragment | undefined>(undefined);
  const [authToken, setAuthToken] = useLocalStorage<string>(authTokenKey);
  const history = useHistory();
  const client = useApolloClient();
  const loginRoute = useAuthRoute({ path: 'login' });
  const resetDoneRoute = useAuthRoute({ path: 'reset-done' });
  const subjectRoute = useSubjectRoute({ path: 'subject-info', subjectCode: 'ERSEB' });

  const displayGraphQLError = useGraphQLErrorNotification();
  const [loginUserMutation] = useLoginUserMutation();
  const [activateUserMutation] = useActivateUserMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data } = await loginUserMutation({ variables: { email, password } });
      setIsLoading(false);

      if (data) {
        setUser(data.login.user);
        setAuthToken(data.login.token);
        history.push(subjectRoute);
      }
    } catch (error) {
      displayGraphQLError(error);
    }
  };

  const logout = () => {
    client.resetStore();
    localStorage.removeItem(authTokenKey);
    history.push(loginRoute);
  };

  const activateUser = async (password: string, token: string) => {
    try {
      setIsLoading(true);
      const { data } = await activateUserMutation({ variables: { password, token } });
      setIsLoading(false);

      if (data) {
        setUser(data.activateUser.user);
        setAuthToken(data.activateUser.token);
        history.push(subjectRoute);
      }
    } catch (error) {
      displayGraphQLError(error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await forgotPasswordMutation({ variables: { email } });
      setIsLoading(false);

      alert('Email sent'); // TODO: Feedback
    } catch (error) {
      displayGraphQLError(error);
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      setIsLoading(true);
      await resetPasswordMutation({ variables: { password, token } });
      setIsLoading(false);

      history.push(resetDoneRoute);
    } catch (error) {
      displayGraphQLError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authToken,
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
