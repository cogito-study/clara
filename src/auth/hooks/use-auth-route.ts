type AuthRouteOption =
  | { path: 'login' }
  | { path: 'register' }
  | { path: 'reset-password' }
  | { path: 'forgot-password' }
  | { path: 'link-expired' };

// eslint-disable-next-line complexity
export const useAuthRoute = (option: AuthRouteOption): string => {
  switch (option.path) {
    case 'login':
      return '/login';
    case 'register':
      return '/register';
    case 'reset-password':
      return '/reset-password';
    case 'forgot-password':
      return '/forgot-password';
    case 'link-expired':
      return '/link-expired';
  }
};
