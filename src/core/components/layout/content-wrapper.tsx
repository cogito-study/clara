import { Box, Flex } from '@chakra-ui/core';
import React, { FC } from 'react';
import { BoxProps } from '../../../../node_modules/@chakra-ui/core/dist/Box';

export const ContentWrapper: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Flex width="full" justify="center" zIndex={10}>
      <Box
        width={['full', '400px', '540px', '600px', '800px']}
        mx={[4, 'initial']}
        mt={[4, 4, 6]}
        {...rest}
      >
        {children}
      </Box>
    </Flex>
  );
};
