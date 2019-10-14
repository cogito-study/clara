import { Box, Heading, Text } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CollabRouteParams } from '../hooks/use-collab-route';

const NotePage = () => {
  const { noteID } = useParams<CollabRouteParams>();

  return (
    <Box p={5} height="100vh" width="100%" bg="teal.800" color="white">
      <Heading>Note Page</Heading>
      <Text>{`Note ${noteID}`}</Text>
    </Box>
  );
};

export default NotePage;
