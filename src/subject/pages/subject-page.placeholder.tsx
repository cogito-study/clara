import React from 'react';
import { Box } from '@chakra-ui/core';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../core/hooks/use-theme';

export const SubjectPagePlaceholder = () => {
  const {
    colors: { grey },
  } = useTheme();

  return (
    <Box mx={16} w={660} h={8} display={['none', 'none', 'none', 'block']}>
      <ContentLoader
        height={40}
        width={800}
        speed={1.5}
        primaryColor={grey[100]}
        primaryOpacity={0.2}
        secondaryColor={grey[300]}
        secondaryOpacity={0.2}
      >
        <rect x="0" y="0" rx="5" ry="5" width="440" height="40" />
      </ContentLoader>
    </Box>
  );
};
