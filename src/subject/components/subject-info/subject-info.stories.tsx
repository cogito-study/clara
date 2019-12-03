import { Button } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { subjectComponents } from '../../utils/storybook';
import { EditInfoModal } from './edit-info-modal';
import { SubjectInfoCard, SubjectInfoCardProps } from './subject-info-card';
import { SubjectTeacherCard, SubjectTeacherCardProps } from './subject-teacher-card';

export default {
  title: subjectComponents('Info'),
};

const infoCardProps: SubjectInfoCardProps = {
  title: 'Vascular surgery longer longer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
};

const teacherCardProps: SubjectTeacherCardProps = {
  name: 'Dr. Guy Smith',
  title: 'adjunct professor',
  email: 'guy.smith@university.edu',
};

export const infoCard = () => <SubjectInfoCard {...infoCardProps} />;
export const infoCardWithGeneralInfos = () => (
  <SubjectInfoCard {...infoCardProps} code="NEPTUN" department="Vascular surgery department" />
);

export const infoCardWithMoreMenu = () => (
  <SubjectInfoCard {...infoCardProps} isEditable isDeletable />
);
export const infoCardWithGeneralInfosWithMoreMenu = () => (
  <SubjectInfoCard
    {...infoCardProps}
    code="NEPTUN"
    department="Vascular surgery department"
    isEditable
    isDeletable
  />
);

export const teacherCard = () => <SubjectTeacherCard {...teacherCardProps} />;

export const addInfoModal = () => {
  const ShowAddInfoModal = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>trigger modal</Button>
        <EditInfoModal
          titleLabel="Add info"
          isOpen={isOpen}
          isLoading={false}
          onClose={() => setOpen(false)}
          onEdit={action('Add info')}
        />
      </>
    );
  };
  return <ShowAddInfoModal />;
};

export const editInfoModal = () => {
  const ShowEditInfoModal = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>trigger modal</Button>
        <EditInfoModal
          titleLabel="Edit info"
          info={{
            id: 'asd',
            title: 'Some info title',
            content: 'Some useful information for the subject',
          }}
          isOpen={isOpen}
          isLoading={false}
          onClose={() => setOpen(false)}
          onEdit={action('Edit info')}
        />
      </>
    );
  };
  return <ShowEditInfoModal />;
};
