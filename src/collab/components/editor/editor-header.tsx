import { Box, Button, ButtonProps, Flex, Icon } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { subjectRoute } from '../../../subject/utils/subject-route';
import { EditorMode } from '../../pages/collab-page';
import { EditorToolbar } from './editor-toolbar';

export interface EditorHeaderProps {
  subject: { name: string; code: string };
  handleEditorModeChange: (newState: EditorMode) => void;
}

export const EditorHeader: FC<EditorHeaderProps> = ({ subject, handleEditorModeChange }) => {
  const { t } = useTranslation('collab');
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
        <EditorHeaderButton rightIcon="small-close" onClick={() => handleEditorModeChange('study')}>
          {t('button.study')}
        </EditorHeaderButton>
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
