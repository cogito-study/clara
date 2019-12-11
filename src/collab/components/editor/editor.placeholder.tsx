import { Box } from '@chakra-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../../core/hooks/';

export const EditorPlaceholder = () => {
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
        <Box mt={[3, 6, 6, 8]} px={[1, 1, 6]} mb={3}>
          <ContentLoader height={32} width={300} {...props}>
            <rect x="0" y="10" width="220" height="16" />
          </ContentLoader>
        </Box>
        <Box
          borderWidth={1}
          borderColor="grey.200"
          width={['100%', '100%', '90%', '90%', '800px']}
          maxW="800px"
          minHeight="80vh"
          m={[0, 0, 6]}
          px={[3, 3, 6]}
          py={[3, 3, 10]}
          borderRadius="none"
        >
          <ContentLoader height={450} width={320} {...props}>
            <rect x="0" y="10" width="300" height="18" />
            <rect x="0" y="36" width="220" height="18" />
            <rect x="0" y="75" width="220" height="12" />
            <rect x="0" y="101" width="260" height="12" />
            <rect x="0" y="127" width="250" height="12" />
            <rect x="0" y="153" width="230" height="12" />
            <rect x="0" y="179" width="200" height="12" />
            <rect x="0" y="240" width="300" height="18" />
            <rect x="0" y="266" width="240" height="18" />
            <rect x="0" y="315" width="220" height="12" />
            <rect x="0" y="341" width="240" height="12" />
            <rect x="0" y="367" width="250" height="12" />
            <rect x="0" y="393" width="230" height="12" />
            <rect x="0" y="419" width="300" height="12" />
          </ContentLoader>
        </Box>
      </Box>
      <Box display={['none', 'none', 'initial', 'initial', 'initial']}>
        <Box mt={[5, 6, 6, 8]} px={[1, 1, 6]}>
          <ContentLoader height={28} width={660} {...props}>
            <rect x="0" y="10" width="300" height="18" />
          </ContentLoader>
        </Box>
        <Box
          borderWidth={1}
          borderColor="grey.200"
          width={['100%', '100%', '90%', '90%', '800px']}
          maxW="800px"
          minHeight="80vh"
          m={6}
          px={6}
          py={10}
          borderRadius="none"
        >
          <ContentLoader height={800} width={660} {...props}>
            <rect x="0" y="10" width="600" height="18" />
            <rect x="0" y="36" width="520" height="18" />
            <rect x="0" y="75" width="620" height="12" />
            <rect x="0" y="101" width="520" height="12" />
            <rect x="0" y="127" width="550" height="12" />
            <rect x="0" y="153" width="630" height="12" />
            <rect x="0" y="179" width="500" height="12" />
            <rect x="0" y="240" width="620" height="18" />
            <rect x="0" y="266" width="540" height="18" />
            <rect x="0" y="315" width="620" height="12" />
            <rect x="0" y="341" width="520" height="12" />
            <rect x="0" y="367" width="550" height="12" />
            <rect x="0" y="393" width="630" height="12" />
            <rect x="0" y="419" width="500" height="12" />
            <rect x="0" y="480" width="620" height="18" />
            <rect x="0" y="506" width="540" height="18" />
            <rect x="0" y="555" width="620" height="12" />
            <rect x="0" y="581" width="520" height="12" />
            <rect x="0" y="607" width="550" height="12" />
            <rect x="0" y="633" width="630" height="12" />
            <rect x="0" y="659" width="500" height="12" />
          </ContentLoader>
        </Box>
      </Box>
    </>
  );
};
