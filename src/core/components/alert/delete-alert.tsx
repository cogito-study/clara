import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Scale,
} from '@chakra-ui/core';
import React, { useRef } from 'react';

type DeleteAlertProps = {
  title: string;
  description: string;
  isLoading: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void;
};

export const DeleteAlert = ({
  title,
  description,
  isLoading,
  isOpen,
  onClose,
  onDelete,
}: DeleteAlertProps) => {
  const cancelRef = useRef(null);

  return (
    <Scale in={isOpen}>
      {(styles) => (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay opacity={styles.opacity} />
          <AlertDialogContent mx={[2, 'auto']} w="auto" {...styles}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" lineHeight="base">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

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
      )}
    </Scale>
  );
};
