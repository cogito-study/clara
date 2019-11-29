import { Box } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../../core/hooks/use-theme';

export const SubjectNotePlaceholder = () => {
  const { colors } = useTheme();

  return (
    <Box borderWidth={1} my={2} borderColor="grey.100" bg="#fff">
      <ContentLoader
        height={180}
        width={300}
        speed={1.5}
        primaryColor={colors.grey[100]}
        primaryOpacity={0.5}
        secondaryColor={colors.grey[300]}
        secondaryOpacity={0.5}
      >
        <rect x="0" y="0" width="300" height="42" />
        <rect x="16" y="60" width="220" height="12" />
        <rect x="16" y="80" width="140" height="12" />
        <rect x="16" y="100" width="85" height="6" />
        <rect x="16" y="114" width="200" height="10" />
        <rect x="16" y="134" width="280" height="10" />
        <rect x="16" y="154" width="250" height="10" />
      </ContentLoader>
    </Box>
  );
};
