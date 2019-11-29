import { Box, Flex } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../../core/hooks/use-theme';

export const FeedPostPlaceholder = () => {
  const { colors } = useTheme();

  const props = {
    speed: 1.5,
    primaryColor: colors.grey[100],
    primaryOpacity: 0.5,
    secondaryColor: colors.grey[300],
    secondaryOpacity: 0.5,
  };

  return (
    <Box p={4} borderWidth={1} my={2} borderColor="grey.100" bg="#fff">
      {/* Mobile */}
      <Box display={['block', 'block', 'none']}>
        <ContentLoader height={124} width={320} {...props}>
          <circle cx="32" cy="32" r="32" />
          <rect x="78" y="18" width="120" height="12" />
          <rect x="78" y="38" width="85" height="10" />
          <rect x="0" y="82" width="280" height="8" />
          <rect x="0" y="98" width="300" height="8" />
          <rect x="0" y="114" width="250" height="8" />
        </ContentLoader>
      </Box>

      {/* Tablet */}
      <Box display={['none', 'none', 'block', 'block', 'none']}>
        <ContentLoader height={120} width={420}>
          <circle cx="28" cy="28" r="28" />
          <rect x="74" y="10" width="120" height="12" />
          <rect x="74" y="30" width="85" height="10" />
          <rect x="0" y="72" width="350" height="8" />
          <rect x="0" y="88" width="380" height="8" />
          <rect x="0" y="106" width="201" height="8" />
        </ContentLoader>
      </Box>

      {/* Desktop */}
      <Box display={['none', 'none', 'none', 'none', 'block']}>
        <ContentLoader height={130} width={660} {...props}>
          <circle cx="28" cy="28" r="28" />
          <rect x="74" y="10" width="120" height="12" />
          <rect x="74" y="30" width="85" height="10" />
          <rect x="0" y="72" width="550" height="8" />
          <rect x="0" y="88" width="600" height="8" />
          <rect x="0" y="106" width="500" height="8" />
        </ContentLoader>
      </Box>
    </Box>
  );
};

export const FeedPostListPlaceholder = () => (
  <Flex direction="column">
    {Array.from({ length: 5 }).map((_, index) => (
      <FeedPostPlaceholder key={index} />
    ))}
  </Flex>
);
