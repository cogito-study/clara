import { Box } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { CollabRouteParams } from '../hooks/use-collab-route';

export const CollabLayout: FC = ({ children }) => {
  const { noteID } = useParams<CollabRouteParams>();
  console.log(noteID);
  return <Box>{children}</Box>;
};
