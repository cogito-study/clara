import { Box, Heading } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const SubjectLayout: FC = ({ children }) => {
  const { t } = useTranslation('subject');

  return (
    <Box p={5} height="100vh" width="100%" bg="teal.800" color="white">
      <Heading>{t('title')}</Heading>
      {children}
    </Box>
  );
};
