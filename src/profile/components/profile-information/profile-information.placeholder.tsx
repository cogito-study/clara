import { Box } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../../core/hooks/use-theme';

export const ProfileInformationPlaceholder = () => {
  const { colors } = useTheme();

  const props = {
    speed: 1.5,
    primaryColor: colors.grey[100],
    primaryOpacity: 0.5,
    secondaryColor: colors.grey[300],
    secondaryOpacity: 0.5,
  };

  return (
    <Box borderWidth={1} p={[4, 4, 5]} borderColor="grey.100" bg="#fff">
      <Box display={['initial', 'initial', 'none']}>
        <ContentLoader height={44} width={240} {...props}>
          <circle cx="22" cy="22" r="22" />
          <rect x="64" y="8" width="120" height="12" />
          <rect x="64" y="24" width="85" height="10" />
        </ContentLoader>
      </Box>
      <Box display={['none', 'none', 'initial', 'initial']}>
        <ContentLoader height={44} width={400} {...props}>
          <circle cx="22" cy="22" r="22" />
          <rect x="64" y="8" width="120" height="12" />
          <rect x="64" y="24" width="85" height="10" />
        </ContentLoader>
      </Box>
    </Box>
  );
};
