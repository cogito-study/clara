import { Box, Heading, Text } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { CollabRouteParams } from '../hooks/use-collab-route';

export const CollabLayout: FC = ({ children }) => {
  const { noteID } = useParams<CollabRouteParams>();

  return (
    <Box p={5} height="100vh" width="100%" bg="teal.800" color="white">
      <Heading>Layout of Collab Page</Heading>
      <Text>{`Note ${noteID}`}</Text>
      {children}
    </Box>
  );
};
