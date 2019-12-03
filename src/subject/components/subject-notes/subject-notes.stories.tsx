import { Button } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { EmptyState } from '../../../core/components/empty-state/empty-state';
import emptyIcon from '../../assets/notelist-empty.svg';
import { subjectComponents } from '../../utils/storybook';
import { EditNoteModal } from './edit-note-modal';
import { SubjectNoteCard, SubjectNoteCardProps } from './subject-note-card';
import { SubjectNotePlaceholder } from './subject-note.placeholder';

export default {
  title: subjectComponents('Notes'),
};

const noteCardProps: SubjectNoteCardProps = {
  id: 'asdfasdf',
  title: 'Vascular surgery longer longer',
  number: 12,
  updatedAt: new Date(),
  description: 'alpha, beta, gamma, delta, omega, epsilon, gamma, kappa, tau',
};

export const noteCard = () => <SubjectNoteCard {...noteCardProps} />;

export const placeholder = () => <SubjectNotePlaceholder />;

export const editable = () => <SubjectNoteCard {...noteCardProps} isEditable />;

export const addNoteModal = () => {
  const ShowAddNoteModal = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>trigger modal</Button>
        <EditNoteModal
          titleLabel="Add Note"
          isOpen={isOpen}
          isLoading={false}
          onClose={() => setOpen(false)}
          onEdit={action('Add note')}
        />
      </>
    );
  };
  return <ShowAddNoteModal />;
};

export const editNoteModal = () => {
  const ShowEditNoteModal = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>trigger modal</Button>
        <EditNoteModal
          titleLabel="Edit note"
          note={{
            id: 'asd',
            title: 'Some note title',
            number: 23,
            description: 'keywoorrd, other keyword, another keyword',
          }}
          isOpen={isOpen}
          isLoading={false}
          onClose={() => setOpen(false)}
          onEdit={action('Edit note')}
        />
      </>
    );
  };
  return <ShowEditNoteModal />;
};

export const emptyNoteListHasAddPermission = () => (
  <EmptyState
    onAdd={action('add')}
    title="Vascular surgery note list is empty!"
    icon={emptyIcon}
    buttonTitle="add new note"
  />
);

export const emptyNoteListHasNoAddPermission = () => (
  <EmptyState
    title="Vascular surgery note list is empty!"
    icon={emptyIcon}
    buttonTitle="add new note"
  />
);
