import { Box, Heading } from '@chakra-ui/core';
import React from 'react';

export const PageTitleHeader = ({ title }: { title: string }) => (
  <Box
    pos="fixed"
    bg="#fff"
    py={['initial', 'initial', 'initial', 4]}
    display={['none', 'none', 'none', 'initial']}
    borderBottomColor="grey.100"
    borderBottomWidth={1}
    width="100%"
    zIndex={10}
  >
    <Heading as="h2" fontSize="xl" color="black" px={16} bg="#fff">
      {title}
    </Heading>
  </Box>
);
