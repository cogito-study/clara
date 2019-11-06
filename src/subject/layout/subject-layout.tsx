import { Flex } from '@chakra-ui/core';
import React from 'react';
import { MainMenu } from '../../core/components/navigation/menu';
import { SubjectPage } from '../pages/subject-page';

export const SubjectLayout = () => {
  return (
    <Flex direction={['column', 'column', 'row']} bg="#fff" color="white">
      <MainMenu />
      <SubjectPage />
    </Flex>
  );
};
