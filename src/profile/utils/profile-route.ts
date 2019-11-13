import { Location } from 'history';

type ProfileRouteOption = { path: 'profile' };

export const profileRoute = (option: ProfileRouteOption): string => {
  switch (option.path) {
    case 'profile':
      return `/profile`;
  }
};

export const isProfilePath = (location: Location) => location.pathname.includes('profile');
