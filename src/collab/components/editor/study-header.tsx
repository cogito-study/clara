import { Button, Flex, Icon } from '@chakra-ui/core';
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
        <Icon
          mx={12}
          // @ts-ignore
          name="cogito"
          size="32px"
          color="blue.800"
        />

        <Link to={subjectRoute({ path: 'subjects', subjectCode: subject.code })}>
          <Button
            leftIcon="chevron-left"
            onClick={() => {}}
            bg="transparent"
            color="blue.800"
            border="2px"
            borderRadius="none"
            borderColor="teal.500"
          >
            {subject.name}
          </Button>
        </Link>
      </Flex>
      <Flex alignItems="center" mx={12} display={['none', 'none', 'initial']}>
        <Button
          rightIcon={FiEdit2}
          onClick={() => handleEditorModeChange('edit')}
          bg="transparent"
          color="blue.800"
          border="2px"
          borderRadius="none"
          borderColor="teal.500"
        >
          {/* TODO Localize */}
          edit
        </Button>
      </Flex>
    </Flex>
  );
};
