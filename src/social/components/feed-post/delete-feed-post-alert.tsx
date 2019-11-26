import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/core';
import React, { useRef } from 'react';

type Props = {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

// TODO: Localize
export const DeleteFeedPostAlert = ({ isLoading, isOpen, onClose, onDelete }: Props) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Are you sure want to delete this post?
        </AlertDialogHeader>

        <AlertDialogBody>You can not undo this action afterwards.</AlertDialogBody>

        <AlertDialogFooter>
          <Button
            isDisabled={isLoading}
            ref={cancelRef}
            variant="outline"
            variantColor="red"
            onClick={onClose}
            borderRadius={0}
            borderWidth={2}
          >
            cancel
          </Button>
          <Button
            variantColor="red"
            isLoading={isLoading}
            onClick={onDelete}
            ml={3}
            borderRadius={0}
          >
            delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
