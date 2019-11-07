import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SubjectInfo } from '../components/subject-info';
import { SubjectNotes } from '../components/subject-notes';
import { SubjectRouteParams } from '../utils/subject-route';
import { useSubjectPageQuery } from './graphql/subject-page-query.generated';

export const SubjectPage = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data } = useSubjectPageQuery({ variables: { subjectCode } });

  return (
    <Box pos="relative" width="100%">
      {data && data.subject && data.subject.name && (
        <Heading as="h2" fontSize="xl" color="black" px={16} pt={5} pb={1} bg="#fff">
          {data.subject.name}
        </Heading>
      )}
      <Tabs color="gray.800" variantColor="teal">
        <TabList pt={2} bg="#fff" width="100%" px={16}>
          {/* TODO: Localize */}
          <Tab fontWeight={600}>information</Tab>
          <Tab fontWeight={600}>notes</Tab>
        </TabList>
        <TabPanels pt={2}>
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
