type AuthRouteOption =
  | { path: 'login' }
  | { path: 'register' }
  | { path: 'reset-password' }
  | { path: 'forgot-password' }
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
    case 'link-expired':
      return '/link-expired';
  }
};
