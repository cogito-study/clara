type SocialRouteOption = { type: 'feed' };

export const useSocialRoute = (option: SocialRouteOption): string => {
  switch (option.type) {
    case 'feed':
      return `/feed`;
  }

  return '/';
};
