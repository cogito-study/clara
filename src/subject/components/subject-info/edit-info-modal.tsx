import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Scale,
  Textarea,
} from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import * as Yup from 'yup';
import { SubjectInfoDataFragment } from './graphql/subject-info-data-fragment.generated';

type EditInfoModalProps = {
  titleLabel: string;
  info?: SubjectInfoDataFragment;
  isLoading: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onEdit: (content: Partial<SubjectInfoDataFragment>) => void;
};

export const EditInfoModal = ({
  titleLabel,
  info,
  isLoading,
  isOpen,
  onClose,
  onEdit,
}: EditInfoModalProps) => {
  const { register, errors, handleSubmit } = useForm<Partial<SubjectInfoDataFragment>>({
    defaultValues: {
      title: info?.title,
      content: info?.content,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
  });

  const onSubmit = handleSubmit((infoData) => {
    onEdit({ ...infoData });
  });

  return (
    <Scale in={isOpen}>
      {(styles) => (
        <Modal isOpen={isOpen} onClose={onClose} size={['full', 'full', 'lg']} isCentered>
          <ModalOverlay opacity={styles.opacity} />
          <ModalContent {...styles}>
            <form onSubmit={onSubmit}>
              <ModalHeader color="blue.800" fontWeight="bold">
                {titleLabel}
              </ModalHeader>
              <ModalCloseButton borderRadius={0} />
              <ModalBody>
                <Box h={100}>
                  <FormControl
                    isInvalid={errors.title && true}
                    flex={['initial', 'initial', 5]}
                    h={100}
                  >
                    <FormLabel
                      htmlFor="title"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      Title
                    </FormLabel>
                    <Input
                      name="title"
                      type="text"
                      ref={register}
                      placeholder="Awesome title"
                      borderRadius={0}
                    />
                    <FormErrorMessage fontSize={14}>{errors.title?.message}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box h={120}>
                  <FormControl isInvalid={errors.content && true}>
                    <FormLabel
                      htmlFor="content"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      Description
                    </FormLabel>
                    <Textarea
                      name="content"
                      placeholder="Add a longer description for the info item"
                      ref={register}
                      borderRadius={0}
                    />
                  </FormControl>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  variantColor="teal"
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  color="blue.800"
                >
                  save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Scale>
  );
};
