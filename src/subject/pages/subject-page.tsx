import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import React from 'react';
import { SubjectInfo } from '../components/subject-info';
import { SubjectNotes } from '../components/subject-notes';

export const SubjectPage = ({ subjectTitle }: { subjectTitle: string }) => {
  return (
    <Box width="100%" ml={['initial', 'initial', 'initial', '250px']}>
      <Tabs color="gray.800" variantColor="teal" display={['none', 'none', 'none', 'initial']}>
        <TabContent subjectTitle={subjectTitle} />
      </Tabs>
      <Tabs
        color="gray.800"
        variantColor="teal"
        align="center"
        display={['initial', 'initial', 'initial', 'none']}
      >
        <TabContent subjectTitle={subjectTitle} />
      </Tabs>
    </Box>
  );
};

export const TabContent = ({ subjectTitle }: { subjectTitle: string }) => (
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
