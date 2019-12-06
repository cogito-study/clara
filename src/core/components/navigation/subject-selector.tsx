import { Modal, ModalCloseButton, ModalContent, ModalOverlay, Scale } from '@chakra-ui/core';
import React from 'react';
import { PickSubjects } from '../../../auth/components/onboarding/pick-subjects';

type SubjectSelectorProps = {
  isLoading: boolean;
  isOpen: boolean;
  onSave?: () => void;
  onClose?: () => void;
};

export const SubjectSelector = ({ isOpen, onClose }: SubjectSelectorProps) => {
  return (
    <Scale in={isOpen}>
      {(styles) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay opacity={styles.opacity} />
          <ModalContent>
            <ModalCloseButton />
            <PickSubjects />
          </ModalContent>
        </Modal>
      )}
    </Scale>
  );
};
