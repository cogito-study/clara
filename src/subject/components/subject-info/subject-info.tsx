import { Heading } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentWrapper, DeleteAlert, ModalOptions } from '../../../core/components';
import {
  SubjectInformationPermissionType,
  SubjectPermissionType,
} from '../../../core/graphql/types.generated';
import { useErrorToast } from '../../../core/hooks';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { AddItemCard } from '../elements/add-item-card';
import { EditInfoModal } from './edit-info-modal';
import { useCreateSubjectInfoMutation } from './graphql/create-subject-info.generated';
import { useDeleteSubjectInfoMutation } from './graphql/delete-subject-info.generated';
import { SubjectInfoDataFragment } from './graphql/subject-info-data-fragment.generated';
import { SubjectInfoDocument, useSubjectInfoQuery } from './graphql/subject-info-query.generated';
import { useUpdateSubjectInfoMutation } from './graphql/update-subject-info.generated';
import { SubjectInfoCard } from './subject-info-card';
import { InfoCardListPlaceholder } from './subject-info-card.placeholder';
import { SubjectTeacherCard } from './subject-teacher-card';

type DeletingInfoState = ModalOptions & { id?: string };
type EditingInfoState = ModalOptions & { info?: SubjectInfoDataFragment };

export const SubjectInfo = ({ subjectCode, id }: SubjectIdentifierProps) => {
  const { t } = useTranslation('subject');

  const [deletingInfoState, setDeletingInfoState] = useState<DeletingInfoState>({ isOpen: false });
  const [editingInfoState, setEditingInfoState] = useState<EditingInfoState>({ isOpen: false });
  const [addingInfoState, setAddingInfoState] = useState<ModalOptions>({ isOpen: false });
  const errorToast = useErrorToast();

  const { data, loading: subjectInfoLoading } = useSubjectInfoQuery({ variables: { subjectCode } });
  const [createSubjectInfo, { loading: createSubjectInfoLoading }] = useCreateSubjectInfoMutation();
  const [updateSubjectInfo, { loading: updateSubjectInfoLoading }] = useUpdateSubjectInfoMutation();
  const [deleteSubjectInfo, { loading: deleteSubjectInfoLoading }] = useDeleteSubjectInfoMutation();

  const handleInfoDelete = async () => {
    if (deletingInfoState.id) {
      try {
        await deleteSubjectInfo({
          variables: { subjectInfoID: deletingInfoState.id },
          refetchQueries: [{ query: SubjectInfoDocument, variables: { subjectCode } }],
        });
      } catch (error) {
        errorToast(error);
      } finally {
        setDeletingInfoState({ isOpen: false });
      }
    }
  };

  const handleInfoEdit = async ({ title, content }: Partial<SubjectInfoDataFragment>) => {
    if (editingInfoState.info) {
      try {
        await updateSubjectInfo({
          variables: { subjectInfoID: editingInfoState.info.id, title, content },
        });
      } catch (error) {
        errorToast(error);
      } finally {
        setEditingInfoState({ isOpen: false });
      }
    }
  };

  const handleInfoAdd = async ({ title, content }: Partial<SubjectInfoDataFragment>) => {
    try {
      await createSubjectInfo({
        variables: { subjectID: id, title: title ?? '', content: content ?? '' },
        refetchQueries: [{ query: SubjectInfoDocument, variables: { subjectCode } }],
      });
    } catch (error) {
      errorToast(error);
    } finally {
      setAddingInfoState({ isOpen: false });
    }
  };

  const hasCreateInfoPermission = data?.subject?.permissions.includes(
    SubjectPermissionType.CreateNote,
  );

  return (
    <ContentWrapper>
      {subjectInfoLoading ? (
        <InfoCardListPlaceholder />
      ) : (
        <>
          {deletingInfoState.isOpen && (
            <DeleteAlert
              title={t('info.alert.delete.title')}
              description={t('info.alert.delete.description')}
              isLoading={deleteSubjectInfoLoading}
              isOpen={deletingInfoState.isOpen}
              onClose={() => setDeletingInfoState({ isOpen: false })}
              onDelete={handleInfoDelete}
            />
          )}
          {editingInfoState.isOpen && (
            <EditInfoModal
              titleLabel={t('info.modal.edit')}
              info={editingInfoState.info}
              isOpen={editingInfoState.isOpen}
              isLoading={updateSubjectInfoLoading}
              onClose={() => setEditingInfoState({ isOpen: false })}
              onEdit={handleInfoEdit}
            />
          )}
          {addingInfoState.isOpen && (
            <EditInfoModal
              titleLabel={t('info.modal.new')}
              isOpen={addingInfoState.isOpen}
              isLoading={createSubjectInfoLoading}
              onClose={() => setAddingInfoState({ isOpen: false })}
              onEdit={handleInfoAdd}
            />
          )}

          <SubjectInfoCard
            title={t('info.general')}
            description={data?.subject?.description ?? ''}
            department={data?.subject?.department.name}
            code={data?.subject?.code}
          />
          <Heading
            mt={[6, 6, 6, 8]}
            mb={[3, 3, 3, 4]}
            fontSize={['md', 'lg']}
            fontWeight="bold"
            maxWidth="80%"
            color="blue.700"
            lineHeight="normal"
          >
            {t('info.teachers')}
          </Heading>
          {data?.subject?.teachers?.map(({ email, fullName }, index: number) => (
            <SubjectTeacherCard key={index} name={fullName} email={email} />
          ))}
          {data?.subject?.informations?.map((info) => {
            const { title, content, id, permissions } = info;
            const hasEditPermission = permissions.includes(
              SubjectInformationPermissionType.UpdateSubjectInformation,
            );
            const hasDeletePermission = permissions.includes(
              SubjectInformationPermissionType.DeleteSubjectInformation,
            );

            return (
              <SubjectInfoCard
                key={id}
                title={title}
                description={content}
                isEditable={hasEditPermission}
                isDeletable={hasDeletePermission}
                onEdit={() => setEditingInfoState({ isOpen: true, info })}
                onDelete={() => setDeletingInfoState({ isOpen: true, id })}
              />
            );
          })}

          {hasCreateInfoPermission && (
            <AddItemCard
              title={t('info.add')}
              onClick={() => setAddingInfoState({ isOpen: true })}
              mt={[6, 6, 6, 8]}
              h={196}
            />
          )}
        </>
      )}
    </ContentWrapper>
  );
};
