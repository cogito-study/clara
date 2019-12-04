import { Button, ButtonProps, Flex, Icon } from '@chakra-ui/core';
import React, { FC } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { subjectRoute } from '../../../subject/utils/subject-route';
import { EditorMode } from '../../pages/collab-page';

export interface StudyHeaderProps {
  subject: { name: string; code: string };
  handleEditorModeChange: (newState: EditorMode) => void;
}

export const StudyHeader: FC<StudyHeaderProps> = ({ subject, handleEditorModeChange }) => {
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
      backgroundColor="white"
    >
      <Flex
        align="center"
        direction={['row-reverse', 'row-reverse', 'row']}
        justifyContent={['space-between', 'space-between', 'flex-start']}
        width={['full', 'full', 'initial']}
      >
        <Icon mx={12} name="cogito" size="32px" color="blue.800" />

        <Link to={subjectRoute({ path: 'subjects-notes', subjectCode: subject.code })}>
          <StudyHeaderButton leftIcon="chevron-left">{subject.name}</StudyHeaderButton>
        </Link>
      </Flex>
      <Flex alignItems="center" mx={12} display={['none', 'none', 'initial']}>
        <StudyHeaderButton rightIcon={FiEdit2} onClick={() => handleEditorModeChange('edit')}>
          {/* TODO Localize */}
          edit
        </StudyHeaderButton>
      </Flex>
    </Flex>
  );
};

const StudyHeaderButton = (props: ButtonProps) => (
  <Button
    variant="outline"
    variantColor="teal"
    color="blue.800"
    borderWidth={2}
    borderRadius={0}
    borderColor="teal.500"
    {...props}
  />
);
