import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import React, { CSSProperties, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Head } from '../../core/components';
import { useTheme } from '../../core/hooks/';
import { SubjectFeed } from '../components/subject-feed/subject-feed';
import { SubjectInfo } from '../components/subject-info/subject-info';
import { SubjectNoteList } from '../components/subject-notes/subject-note-list';
import { subjectRoute, SubjectRouteParams } from '../utils/subject-route';
import { useSubjectPageQuery } from './graphql/subject-page-query.generated';
import { SubjectPagePlaceholder } from './subject-page.placeholder';

export type SubjectIdentifierProps = {
  id: string;
  subjectCode?: string;
};

export const SubjectPage = () => {
  const { t } = useTranslation('subject');
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data, loading } = useSubjectPageQuery({ variables: { subjectCode } });

  const subjectIdentifierProps: SubjectIdentifierProps = {
    subjectCode,
    id: data?.subject?.id ?? '',
  };

  return (
    <>
      <Head title={data?.subject?.name} />
      <Box width="100%" mt={[12, 12, 12, 'initial']} pb={12}>
        <Box
          pos="fixed"
          bg="#fff"
          pt={['initial', 'initial', 'initial', 5]}
          width="100%"
          zIndex={10}
          borderBottom="1px"
          borderColor="grey.100"
        >
          {loading ? (
            <SubjectPagePlaceholder />
          ) : (
            <Flex direction="row" justify="space-between" width="100%">
              <Heading
                as="h2"
                display={['none', 'none', 'none', 'initial']}
                fontSize="xl"
                color="black"
                px={16}
                pb={1}
                bg="#fff"
              >
                {data?.subject?.name}
              </Heading>

              {
                // TBD ux-wise
                /* <Button
            size="md"
            bg="teal.500"
            color="blue.800"
            leftIcon="add"
            borderRadius={0}
            display={['none', 'none', 'none', 'initial']}
            mr={260}
          >
            add new note
          </Button> */
              }
            </Flex>
          )}
          <Flex
            bg="#fff"
            justify={['stretch', 'stretch', 'flex-start']}
            width="100%"
            px={[0, 0, 0, 16]}
            mt={['initial', 'initial', 'initial', 1]}
          >
            <TabLink to={subjectRoute({ path: 'subjects-notes', subjectCode })}>
              {t('notes.title')}
            </TabLink>
            <TabLink to={subjectRoute({ path: 'subjects-feed', subjectCode })}>
              {t('feed.title')}
            </TabLink>
            <TabLink to={subjectRoute({ path: 'subjects-info', subjectCode })}>
              {t('info.title')}
            </TabLink>
          </Flex>
        </Box>
        <Box width="100%" pt={[6, 10, 10, 20]}>
          <Switch>
            <Route path={subjectRoute({ path: 'subjects-notes' })}>
              <SubjectNoteList {...subjectIdentifierProps} />
            </Route>
            <Route path={subjectRoute({ path: 'subjects-feed' })}>
              <SubjectFeed {...subjectIdentifierProps} />
            </Route>
            <Route path={subjectRoute({ path: 'subjects-info' })}>
              <SubjectInfo {...subjectIdentifierProps} />
            </Route>
            <Redirect to={subjectRoute({ path: 'subjects-notes' })} />
          </Switch>
        </Box>
      </Box>
    </>
  );
};

const TabLink: FC<{ to: string }> = ({ to, children }) => {
  const { colors } = useTheme();

  const navLinkStyles: { style: CSSProperties; activeStyle: CSSProperties } = {
    style: {
      width: '100%',
      borderBottom: '2px solid',
      borderColor: 'transparent',
      padding: '6px 12px',
      zIndex: 2,
    },
    activeStyle: { color: colors.teal[800], borderColor: colors.teal[600] },
  };
  return (
    <Button
      p={0}
      pt={2}
      h="41px"
      fontSize="sm"
      w={['100%', '100%', '100%', 128]}
      variant="ghost"
      variantColor="teal"
      borderRadius={0}
      borderBottom="2px"
      borderColor="#fff"
      textAlign="center"
      color="grey.800"
      fontWeight="semibold"
      _hover={{ color: 'teal.600', bg: '#fff', borderColor: 'teal.600' }}
    >
      <NavLink to={to} {...navLinkStyles}>
        {children}
      </NavLink>
    </Button>
  );
};
