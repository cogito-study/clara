import { Box, Flex } from '@chakra-ui/core';
import { BoxProps } from '../../../../node_modules/@chakra-ui/core/dist/Box';
import React, { FC } from 'react';

export const ContentWrapper: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Flex width="full" justify="center">
      <Box
        {...rest}
        width={['full', '400px', '540px', '600px', '800px']}
        mx={[4, 'initial']}
        mt={[4, 4, 6]}
      >
        {children}
      </Box>
    </Flex>
  );
};
