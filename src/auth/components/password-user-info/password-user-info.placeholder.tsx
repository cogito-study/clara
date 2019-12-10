import { Box } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../../core/hooks/';

export const PasswordUserInfoPlaceholder = () => {
  const { colors } = useTheme();

  return (
    <Box w="100%">
      <ContentLoader
        height={64}
        width={254}
        speed={1.5}
        primaryColor={colors.grey[100]}
        primaryOpacity={0.5}
        secondaryColor={colors.grey[300]}
        secondaryOpacity={0.5}
      >
        <circle cx="26" cy="26" r="26" />
        <rect x="68" y="10" width="120" height="12" />
        <rect x="68" y="30" width="85" height="9" />
      </ContentLoader>
    </Box>
  );
};
