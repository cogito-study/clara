import { useApolloClient } from '@apollo/react-hooks';
import React, { createContext, FC, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocalStorage } from 'standard-hooks';
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
  login: (email: string, password: string) => void;
  logout: () => void;
  activateUser: (password: string, token: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  activateUser: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
});

const authTokenKey = 'AUTH_TOKEN';

export const AuthProvider: FC = ({ children }) => {
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
      const { data } = await loginUserMutation({ variables: { email, password } });

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
      const { data } = await activateUserMutation({ variables: { password, token } });
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
      await forgotPasswordMutation({ variables: { email } });
      alert('Email sent'); // TODO: Feedback
    } catch (error) {
      displayGraphQLError(error);
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      await resetPasswordMutation({ variables: { password, token } });
      history.push(resetDoneRoute);
    } catch (error) {
      displayGraphQLError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, login, logout, activateUser, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
