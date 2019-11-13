import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import React from 'react';
import { SubjectInfo } from '../components/subject-info/subject-info';
import { SubjectNotes } from '../components/subject-notes/subject-notes';
import { useSubjectPageQuery } from './graphql/subject-page-query.generated';
import { useParams } from 'react-router';
import { SubjectRouteParams } from '../utils/subject-route';

export const SubjectPage = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data } = useSubjectPageQuery({ variables: { subjectCode } });

  return (
    <>
      <Tabs color="gray.800" variantColor="teal" display={['none', 'none', 'none', 'initial']}>
        <TabContent subjectTitle={data && data.subject && data.subject.name} />
      </Tabs>
      <Tabs
        color="gray.800"
        variantColor="teal"
        align="center"
        display={['initial', 'initial', 'initial', 'none']}
      >
        <TabContent subjectTitle={data && data.subject && data.subject.name} />
      </Tabs>
    </>
  );
};

const TabContent = ({ subjectTitle }: { subjectTitle?: string }) => (
  <Box width="100%" mt={[12, 12, 12, 'initial']} pb={12}>
    <Box pos="fixed" bg="#fff" pt={['initial', 'initial', 'initial', 5]} width="100%" zIndex={10}>
      <Heading
        as="h2"
        display={['none', 'none', 'none', 'initial']}
        fontSize="xl"
        color="black"
        px={16}
        pb={1}
        bg="#fff"
      >
        {subjectTitle}
      </Heading>
      <TabList pt={2} bg="#fff" width="100%" px={[0, 0, 0, 16]}>
        {/* TODO: Localize */}
        <Tab fontWeight={600} flex={[1, 1, 1, 'initial']}>
          information
        </Tab>
        <Tab fontWeight={600} flex={[1, 1, 1, 'initial']}>
          notes
        </Tab>
      </TabList>
    </Box>
    <Box width="100%" pt={[6, 10, 10, 20]}>
      <TabPanels pt={2}>
        <TabPanel>
          <SubjectInfo />
        </TabPanel>
        <TabPanel>
          <SubjectNotes />
        </TabPanel>
      </TabPanels>
    </Box>
  </Box>
);
