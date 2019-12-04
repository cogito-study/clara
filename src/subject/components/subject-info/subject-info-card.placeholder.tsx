import { Box, Flex } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../../core/hooks/use-theme';

export const SubjectInfoCardPlaceholder = () => {
  const { colors } = useTheme();

  const props = {
    speed: 1.5,
    primaryColor: colors.grey[100],
    primaryOpacity: 0.5,
    secondaryColor: colors.grey[300],
    secondaryOpacity: 0.5,
  };

  return (
    <>
      <Box display={['initial', 'initial', 'none', 'none', 'none']}>
        <Box mt={[3, 6, 6, 8]}>
          <ContentLoader height={32} width={300} {...props}>
            <rect x="0" y="10" width="220" height="16" />
          </ContentLoader>
        </Box>
        <Box p={6} borderWidth={1} my={2} borderColor="grey.100" bg="#fff">
          <ContentLoader height={240} width={320} {...props}>
            <rect x="0" y="0" width="280" height="12" />
            <rect x="0" y="32" width="180" height="12" />
            <rect x="0" y="64" width="280" height="12" />
            <rect x="0" y="96" width="300" height="12" />
            <rect x="0" y="128" width="250" height="12" />
            <rect x="0" y="160" width="300" height="12" />
            <rect x="0" y="192" width="250" height="12" />
            <rect x="0" y="224" width="280" height="12" />
          </ContentLoader>
        </Box>
      </Box>
      <Box display={['none', 'none', 'initial', 'initial', 'initial']}>
        <Box mt={[5, 6, 6, 8]}>
          <ContentLoader height={28} width={660} {...props}>
            <rect x="0" y="10" width="300" height="12" />
          </ContentLoader>
        </Box>
        <Box p={4} borderWidth={1} my={2} borderColor="grey.100" bg="#fff">
          <ContentLoader height={90} width={660} {...props}>
            <rect x="0" y="10" width="620" height="8" />
            <rect x="0" y="26" width="520" height="8" />
            <rect x="0" y="42" width="550" height="8" />
            <rect x="0" y="58" width="630" height="8" />
            <rect x="0" y="74" width="500" height="8" />
          </ContentLoader>
        </Box>
      </Box>
    </>
  );
};

export const InfoCardListPlaceholder = () => (
  <Flex direction="column">
    {Array.from({ length: 5 }).map((_, index) => (
      <SubjectInfoCardPlaceholder key={index} />
    ))}
  </Flex>
);
