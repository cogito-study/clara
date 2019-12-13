import { Button, ButtonProps, Flex, Icon } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEdit2 } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { subjectRoute } from '../../../subject/utils/subject-route';
import { collabRoute, CollabRouteParams } from '../../utils/collab-route';

export interface StudyHeaderProps {
  subject: { name: string; code: string };
}

export const StudyHeader: FC<StudyHeaderProps> = ({ subject }) => {
  const { t } = useTranslation('collab');
  const { noteID } = useParams<CollabRouteParams>();

  return (
    <Flex
      flexGrow={1}
      position="fixed"
      top={0}
      width="full"
      height="56px"
      zIndex={2}
      justify="center"
      backgroundColor="#FFF"
      borderBottomWidth={1}
      borderBottomColor="grey.100"
    >
      <Flex flexGrow={1} maxWidth="1400px" align="center" justifyContent="space-between">
        <Flex
          align="center"
          direction={['row-reverse', 'row-reverse', 'row']}
          justifyContent={['space-between', 'space-between', 'flex-start']}
          width={['full', 'full', 'initial']}
          maxWidth="1400px"
        >
          <Icon mx={[2, 10]} name="cogito" size="32px" color="blue.800" />

          <Link to={subjectRoute({ path: 'subjects-notes', subjectCode: subject.code })}>
            <StudyHeaderButton display={['none', 'none', 'initial']} leftIcon="chevron-left" mx={3}>
              {subject.name}
            </StudyHeaderButton>
            <StudyHeaderButton
              display={['initial', 'initial', 'none']}
              leftIcon="chevron-left"
              mx={3}
            >
              {t('button.back')}
            </StudyHeaderButton>
          </Link>
        </Flex>
        <Flex alignItems="center" mx={2} display={['none', 'none', 'none', 'initial']}>
          <Link to={collabRoute({ path: 'note-edit', noteID })}>
            <StudyHeaderButton rightIcon={FiEdit2}>{t('button.edit')}</StudyHeaderButton>
          </Link>
        </Flex>
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
