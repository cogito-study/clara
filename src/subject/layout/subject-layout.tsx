import { Box, Heading } from '@chakra-ui/core';
import React, { FC } from 'react';

export const SubjectLayout: FC = ({ children }) => {
  return (
    <Box p={5} height="100vh" width="100%" bg="teal.800" color="white">
      <Heading>Layout of Subject Page</Heading>
      {children}
    </Box>
  );
};
