type AuthRouteOption =
  | { path: 'login' }
  | { path: 'register' }
  | { path: 'reset-password' }
  | { path: 'forgot-password' }
  | { path: 'activate-invitation' }
  | { path: 'activate-registration' }
  | { path: 'link-expired' };

export const authRoute = (option: AuthRouteOption): string => {
  switch (option.path) {
    case 'login':
      return '/login';
    case 'register':
      return '/register';
    case 'reset-password':
      return '/reset-password';
    case 'forgot-password':
      return '/forgot-password';
    case 'activate-invitation':
      return '/activate-invitation';
    case 'activate-registration':
      return '/activate-registration';
    case 'link-expired':
      return '/link-expired';
  }
};
