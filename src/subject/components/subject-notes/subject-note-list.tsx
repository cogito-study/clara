import { SimpleGrid } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteAlert } from '../../../core/components/alert/delete-alert';
import { EmptyState } from '../../../core/components/empty-state/empty-state';
import { ModalOptions } from '../../../core/components/modal/types';
import { NotePermissionType, SubjectPermissionType } from '../../../core/graphql/types.generated';
import { useGraphQLErrorNotification } from '../../../core/hooks';
import EmptyIcon from '../../assets/notelist-empty.svg';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { AddItemCard } from '../elements/add-item-card';
import { EditNoteModal } from './edit-note-modal';
import { useCreateNoteMutation } from './graphql/create-note-mutation.generated';
import { useDeleteNoteMutation } from './graphql/delete-note-mutation.generated';
import { NoteDataFragment } from './graphql/note-data-fragment.generated';
import {
  SubjectNoteListDocument,
  useSubjectNoteListQuery,
} from './graphql/subject-note-list-query.generated';
import { useUpdateNoteMutation } from './graphql/update-note-mutation.generated';
import { SubjectNoteCard } from './subject-note-card';
import { SubjectNotePlaceholder } from './subject-note.placeholder';

type DeletingNoteState = ModalOptions & { id?: string };
type EditingNoteState = ModalOptions & { note?: NoteDataFragment };

export const SubjectNoteList = ({ subjectCode, id }: SubjectIdentifierProps) => {
  const { t } = useTranslation('subject');
  const [deletingNoteState, setDeletingNoteState] = useState<DeletingNoteState>({ isOpen: false });
  const [editingNoteState, setEditingNoteState] = useState<EditingNoteState>({ isOpen: false });
  const [addingNoteState, setAddingNoteState] = useState<ModalOptions>({ isOpen: false });
  const displayGraphQLError = useGraphQLErrorNotification();

  const { data, loading: subjectListLoading } = useSubjectNoteListQuery({
    variables: { subjectCode },
  });
  const [deleteNote, { loading: deleteNoteLoading }] = useDeleteNoteMutation();
  const [updateNote, { loading: updateNoteLoading }] = useUpdateNoteMutation();
  const [createNote, { loading: createNoteLoading }] = useCreateNoteMutation();

  const handleNoteDelete = async () => {
    if (deletingNoteState.id) {
      try {
        await deleteNote({
          variables: { id: deletingNoteState.id },
          refetchQueries: [{ query: SubjectNoteListDocument, variables: { subjectCode } }],
        });
      } catch (error) {
        displayGraphQLError(error);
      } finally {
        setDeletingNoteState({ isOpen: false });
      }
    }
  };

  const handleNoteEdit = async ({ title, number, description }: Partial<NoteDataFragment>) => {
    if (editingNoteState.note) {
      try {
        await updateNote({
          variables: { id: editingNoteState.note.id, title, description, number },
        });
      } catch (error) {
        displayGraphQLError(error);
      } finally {
        setEditingNoteState({ isOpen: false });
      }
    }
  };

  const handleNoteAdd = async ({ title, number, description }: Partial<NoteDataFragment>) => {
    try {
      await createNote({
        variables: {
          subjectID: id,
          title: title ?? '',
          description: description ?? '',
          number: number ?? 0,
        },
        refetchQueries: [{ query: SubjectNoteListDocument, variables: { subjectCode } }],
      });
    } catch (error) {
      displayGraphQLError(error);
    } finally {
      setAddingNoteState({ isOpen: false });
    }
  };

  const hasCreateNotePermission = data?.subject?.permissions.includes(
    SubjectPermissionType.CreateNote,
  );

  const isNoteListEmpty = data?.subject?.notes.length === 0;

  return (
    <>
      {deletingNoteState.isOpen && (
        <DeleteAlert
          title={t('notes.alert.delete.title')}
          description={t('notes.alert.delete.description')}
          isLoading={deleteNoteLoading}
          isOpen={deletingNoteState.isOpen}
          onClose={() => setDeletingNoteState({ isOpen: false })}
          onDelete={handleNoteDelete}
        />
      )}
      {editingNoteState.isOpen && (
        <EditNoteModal
          titleLabel={t('notes.modal.edit')}
          note={editingNoteState.note}
          isOpen={editingNoteState.isOpen}
          isLoading={updateNoteLoading}
          onClose={() => setEditingNoteState({ isOpen: false })}
          onEdit={handleNoteEdit}
        />
      )}
      {addingNoteState.isOpen && (
        <EditNoteModal
          titleLabel={t('notes.modal.new')}
          isOpen={addingNoteState.isOpen}
          isLoading={createNoteLoading}
          onClose={() => setAddingNoteState({ isOpen: false })}
          onEdit={handleNoteAdd}
        />
      )}

      <SimpleGrid
        spacing={[4, 4, 8]}
        minChildWidth={288}
        mx={[4, 4, 8, 16, 'auto']}
        mt={10}
        w={[null, null, null, null, 948]}
      >
        {subjectListLoading ? (
          Array.from({ length: 9 }).map((_, index) => <SubjectNotePlaceholder key={index} />)
        ) : isNoteListEmpty ? (
          <EmptyState
            title={t('notes.empty')}
            icon={EmptyIcon}
            buttonTitle={t('notes.add')}
            onAdd={hasCreateNotePermission ? () => setAddingNoteState({ isOpen: true }) : undefined}
          />
        ) : (
          <>
            {data?.subject?.notes?.map((note) => {
              const { permissions, id } = note;

              return (
                <SubjectNoteCard
                  key={id}
                  isEditable={permissions.includes(NotePermissionType.UpdateNote)}
                  isDeletable={permissions.includes(NotePermissionType.DeleteNote)}
                  onNoteDelete={() => setDeletingNoteState({ id, isOpen: true })}
                  onNoteEdit={() => setEditingNoteState({ isOpen: true, note })}
                  {...note}
                />
              );
            })}
            {hasCreateNotePermission && (
              <AddItemCard
                title={t('notes.add')}
                onClick={() => setAddingNoteState({ isOpen: true })}
              />
            )}
          </>
        )}
      </SimpleGrid>
    </>
  );
};
