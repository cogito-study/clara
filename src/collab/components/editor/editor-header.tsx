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
      height="50px"
      zIndex={2}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="blue.800"
    >
      <Prompt when={hasMySuggestion} message={t('unsavedChanges')} />
      <Flex
        align="center"
        direction={['row-reverse', 'row-reverse', 'row']}
        justifyContent={['space-between', 'space-between', 'flex-start']}
        width={['full', 'full', 'initial']}
      >
        <Icon mx={12} name="cogito" size="32px" color="white" />
        <Box display={['none', 'none', 'none', 'inline-flex']}>
          <EditorToolbar />
        </Box>
      </Flex>
      <Flex alignItems="center" mx={12} display={['none', 'none', 'initial']}>
        <Link to={subjectRoute({ path: 'subjects-notes', subjectCode: subject.code })}>
          <EditorHeaderButton leftIcon="chevron-left" mr={3}>
            {subject.name}
          </EditorHeaderButton>
        </Link>
        <Link to={collabRoute({ path: 'note-study', noteID })}>
          <EditorHeaderButton rightIcon="small-close">{t('button.study')}</EditorHeaderButton>
        </Link>
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
