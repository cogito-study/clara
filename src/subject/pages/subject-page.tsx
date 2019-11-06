import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubjectInfo } from '../components/subject-info';
import { SubjectNotes } from '../components/subject-notes';

export const SubjectPage = () => {
  const { t } = useTranslation('subject');

  return (
    <Box pos="relative" px={12} pt={4}>
      <Heading as="h2" fontSize="xl" color="black">
        {t('title')}
      </Heading>
      <Tabs color="gray.800" bg="#fff">
        <TabList pt={2}>
          {/* TODO: Localize */}
          <Tab>information</Tab>
          <Tab>notes</Tab>
        </TabList>
        <TabPanels p="2rem">
          <TabPanel>
            <SubjectInfo />
          </TabPanel>
          <TabPanel>
            <SubjectNotes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
