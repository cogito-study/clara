import { Button } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { subjectComponents } from '../../utils/storybook';
import { AddNoteCard } from './add-note-card';
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
        <EditNoteModal isOpen={isOpen} isLoading={false} onClose={() => setOpen(false)} />
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
          title="Some note title"
          number={23}
          keywords="keywoorrd, other keyword, another keyword"
          isOpen={isOpen}
          isLoading={false}
          onClose={() => setOpen(false)}
        />
      </>
    );
  };
  return <ShowEditNoteModal />;
};

export const addNoteCard = () => <AddNoteCard onClick={action('Add note')} />;
