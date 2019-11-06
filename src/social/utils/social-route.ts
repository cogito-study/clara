type SocialRouteOption = { type: 'feed' };

export const socialRoute = (option: SocialRouteOption): string => {
  switch (option.type) {
    case 'feed':
      return `/feed`;
  }
};
