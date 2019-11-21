import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { SubjectFeed } from '../components/subject-feed/subject-feed';
import { SubjectInfo } from '../components/subject-info/subject-info';
import { SubjectNotes } from '../components/subject-notes/subject-notes';
import { SubjectRouteParams } from '../utils/subject-route';
import { useSubjectPageQuery } from './graphql/subject-page-query.generated';
import { SubjectPagePlaceholder } from './subject-page.placeholder';

export type SubjectIdentifierProps = {
  id: string;
  subjectCode?: string;
};

// eslint-disable-next-line complexity
export const SubjectPage = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data, loading } = useSubjectPageQuery({ variables: { subjectCode } });

  const subjectIdentifierProps: SubjectIdentifierProps = {
    subjectCode,
    id: (data && data.subject && data.subject.id) || '',
  };

  return (
    <>
      <Tabs color="grey.800" variantColor="teal" display={['none', 'none', 'none', 'initial']}>
        <TabContent
          isLoading={loading}
          subjectTitle={data && data.subject && data.subject.name}
          {...subjectIdentifierProps}
        />
      </Tabs>
      <Tabs
        color="gray.800"
        variantColor="teal"
        align="center"
        display={['initial', 'initial', 'initial', 'none']}
      >
        <TabContent
          isLoading={loading}
          subjectTitle={data && data.subject && data.subject.name}
          {...subjectIdentifierProps}
        />
      </Tabs>
    </>
  );
};

const TabContent = ({
  isLoading,
  subjectTitle,
  ...rest
}: { isLoading: boolean; subjectTitle?: string } & SubjectIdentifierProps) => (
  <Box width="100%" mt={[12, 12, 12, 'initial']} pb={12}>
    <Box pos="fixed" bg="#fff" pt={['initial', 'initial', 'initial', 5]} width="100%" zIndex={10}>
      {isLoading ? (
        <SubjectPagePlaceholder />
      ) : (
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
      )}
      <TabList pt={2} bg="#fff" width="100%" px={[0, 0, 0, 16]}>
        {/* TODO: Localize */}
        <Tab fontWeight={600} flex={[1, 1, 1, 'initial']}>
          feed
        </Tab>
        <Tab fontWeight={600} flex={[1, 1, 1, 'initial']}>
          notes
        </Tab>
        <Tab fontWeight={600} flex={[1, 1, 1, 'initial']}>
          information
        </Tab>
      </TabList>
    </Box>
    <Box width="100%" pt={[6, 10, 10, 20]}>
      <TabPanels pt={2}>
        <TabPanel>
          <SubjectFeed {...rest} />
        </TabPanel>
        <TabPanel>
          <SubjectNotes {...rest} />
        </TabPanel>
        <TabPanel>
          <SubjectInfo {...rest} />
        </TabPanel>
      </TabPanels>
    </Box>
  </Box>
);
