import { Box, Heading, Text } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CollabRouteParams } from '../hooks/use-collab-route';

const NotePage = () => {
  const { subjectCode, noteID } = useParams<CollabRouteParams>();

  return (
    <Box p={5} height="100vh" width="100%" bg="teal.800" color="white">
      <Heading>Note Page</Heading>
      <Text>{`Note ${noteID} of ${subjectCode}`}</Text>
    </Box>
  );
};

export default NotePage;
