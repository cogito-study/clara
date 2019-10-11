type ProfileRouteOption = { path: 'profile' };

export const useProfileRoute = (option: ProfileRouteOption): string => {
  switch (option.path) {
    case 'profile':
      return `/profile`;
  }
};
