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
import { useFormik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import { InfoDataFragment } from './info-data-fragment.generated';

type EditInfoModalProps = {
  titleLabel: string;
  info?: InfoDataFragment;
  isLoading: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onEdit: (content: Partial<InfoDataFragment>) => void;
};

export const EditInfoModal = ({
  titleLabel,
  info,
  isLoading,
  isOpen,
  onClose,
  onEdit,
}: EditInfoModalProps) => {
  const titleInputRef = useRef(null);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: info && info.title,
      content: info && info.content,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: async (infoData, { resetForm }) => {
      onEdit({ ...infoData });
      resetForm();
    },
  });

  return (
    <Scale in={isOpen}>
      {(styles) => (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={['full', 'full', 'lg']}
          isCentered
          initialFocusRef={titleInputRef}
        >
          <ModalOverlay opacity={styles.opacity} />
          <ModalContent {...styles}>
            <form onSubmit={handleSubmit}>
              <ModalHeader color="blue.800" fontWeight="bold">
                {titleLabel}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box h={100}>
                  <FormControl
                    isInvalid={errors.title && touched.title ? true : false}
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
                      id="title"
                      type="text"
                      ref={titleInputRef}
                      placeholder="Awesome title"
                      value={values.title}
                      onChange={handleChange}
                      borderRadius={0}
                    />
                    <FormErrorMessage fontSize={14}>{errors.title}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box h={120}>
                  <FormControl isInvalid={errors.title && touched.title ? true : false}>
                    <FormLabel
                      htmlFor="description"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      Description
                    </FormLabel>
                    <Textarea
                      id="content"
                      placeholder="Add a longer description for the info item"
                      value={values.content}
                      onChange={handleChange}
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
