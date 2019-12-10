import { Box } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../hooks/';

export const MenuSubjectsPlaceholder = () => {
  const {
    colors: { blue },
  } = useTheme();

  return (
    <Box mt={1} w={['60%', '60%', '70%', '100%']}>
      <ContentLoader
        height={280}
        width={260}
        speed={2}
        primaryColor={blue[50]}
        primaryOpacity={0.2}
        secondaryColor={blue[300]}
        secondaryOpacity={0.2}
      >
        <rect x="8" y="20" width="220" height="24" />
        <rect x="8" y="60" width="200" height="24" />
        <rect x="8" y="100" width="230" height="24" />
        <rect x="8" y="140" width="220" height="24" />
        <rect x="8" y="180" width="180" height="24" />
        <rect x="8" y="220" width="240" height="24" />
      </ContentLoader>
    </Box>
  );
};

export const MobileMenuTitlePlaceholder = () => {
  const {
    colors: { blue },
  } = useTheme();

  return (
    <Box mx={10} w={200}>
      <ContentLoader
        height={20}
        width={200}
        speed={1.5}
        primaryColor={blue[100]}
        primaryOpacity={0.2}
        secondaryColor={blue[300]}
        secondaryOpacity={0.2}
      >
        <rect x="0" y="0" width="200" height="20" />
      </ContentLoader>
    </Box>
  );
};
