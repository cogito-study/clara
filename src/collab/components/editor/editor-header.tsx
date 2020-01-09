import { Box, Button, ButtonProps, Flex, Icon } from '@chakra-ui/core';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Prompt, useParams } from 'react-router-dom';
import { subjectRoute } from '../../../subject/utils/subject-route';
import { collabRoute, CollabRouteParams } from '../../utils/collab-route';
import { EditorToolbar } from './editor-toolbar';

export interface EditorHeaderProps {
  subject: { name: string; code: string };
  hasMySuggestion: boolean;
}

export const EditorHeader: FC<EditorHeaderProps> = ({ subject, hasMySuggestion }) => {
  const { t } = useTranslation('collab');
  const { noteID } = useParams<CollabRouteParams>();

  useEffect(() => {
    if (hasMySuggestion) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [hasMySuggestion]);

  return (
    <Flex
      flexGrow={1}
      position="fixed"
      top={0}
      width="full"
      height="56px"
      zIndex={5400}
      backgroundColor="blue.800"
      justify="center"
    >
      <Prompt when={hasMySuggestion} message={t('unsavedChanges')} />
      <Flex flexGrow={1} maxWidth="1400px" alignItems="center" justifyContent="space-between">
        <Flex
          align="center"
          justifyContent={['space-between', 'space-between', 'flex-start']}
          width={['full', 'full', 'initial']}
          maxWidth="1200px"
        >
          <Icon mx={[5, 3, 3, 3, 10]} name="cogito" size="32px" color="white" />
          <Box display={['none', 'none', 'none', 'inline-flex']} minWidth="390px">
            <EditorToolbar />
          </Box>
        </Flex>
        <Flex alignItems="center" mx={2}>
          <Link to={subjectRoute({ path: 'subjects-notes', subjectCode: subject.code })}>
            <EditorHeaderButton
              leftIcon="chevron-left"
              display={['none', 'none', 'none', 'inline-flex']}
              mr={2}
            >
              {subject.name}
            </EditorHeaderButton>
          </Link>
          <Link to={collabRoute({ path: 'note-study', noteID })}>
            <EditorHeaderButton rightIcon="small-close">{t('button.study')}</EditorHeaderButton>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

const EditorHeaderButton = (props: ButtonProps) => (
  <Button
    bg="transparent"
    color="white"
    borderWidth={2}
    borderRadius={0}
    borderColor="teal.500"
    _hover={{ bg: 'teal.500', color: 'blue.800' }}
    {...props}
  />
);
