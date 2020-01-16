type SocialRouteOption = { path: 'feed' };

export const socialRoute = (option: SocialRouteOption): string => {
  switch (option.path) {
    case 'feed':
      return `/feed`;
  }
};
