type ProfileRouteOption = { path: 'profile' };

export const profileRoute = (option: ProfileRouteOption): string => {
  switch (option.path) {
    case 'profile':
      return `/profile`;
  }
};
