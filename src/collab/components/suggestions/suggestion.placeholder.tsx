import { Flex } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../../core/hooks/';

export const SuggestionPlaceholder = () => {
  const {
    colors: { grey },
  } = useTheme();

  return (
    <Flex direction="column" borderWidth={1} bg="#fff" p={3} width="300px">
      <ContentLoader
        height={230}
        width={320}
        speed={1.5}
        primaryColor={grey[100]}
        primaryOpacity={0.5}
        secondaryColor={grey[300]}
      >
        <circle cx="32" cy="32" r="32" />
        <rect x="78" y="12" width="160" height="18" />
        <rect x="78" y="42" width="85" height="10" />
        <rect x="0" y="88" width="280" height="14" />
        <rect x="0" y="112" width="300" height="14" />
        <rect x="0" y="136" width="250" height="14" />
        <rect x="100" y="180" width="100" height="40" />
        <rect x="210" y="180" width="100" height="40" />
      </ContentLoader>
    </Flex>
  );
};
