import {
  Box,
  Button,
  Flex,
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Scale,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import { NoteDataFragment } from './graphql/note-data-fragment.generated';

type EditNoteModalProps = {
  titleLabel: string;
  note?: NoteDataFragment;
  isLoading: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onEdit: (content: Partial<NoteDataFragment>) => void;
};

// TODO: Permitted numbers
export const EditNoteModal = ({
  titleLabel,
  note,
  isLoading,
  isOpen,
  onClose,
  onEdit,
}: EditNoteModalProps) => {
  const titleInputRef = useRef(null);
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: note && note.title,
      description: note && note.description,
      number: note && note.number,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: async (noteData, { resetForm }) => {
      onEdit({ ...noteData });
      resetForm();
    },
  });

  return (
    <Scale in={isOpen}>
      {(styles) => (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
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
                <Flex direction="row" h={100}>
                  <FormControl isInvalid={errors.title && touched.title ? true : false} flex="5">
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
                  <FormControl
                    isInvalid={errors.number && touched.number ? true : false}
                    flex="2"
                    ml={2}
                  >
                    <FormLabel
                      htmlFor="noteNumber"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      Number
                    </FormLabel>
                    <NumberInput
                      min={0}
                      max={200}
                      defaultValue={note && note.number}
                      onChange={(value) => setFieldValue('number', parseInt(value))}
                    >
                      <NumberInputField id="noteNumber" borderRadius={0} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Flex>
                <Box h={100}>
                  <FormControl isInvalid={errors.title && touched.title ? true : false}>
                    <FormLabel
                      htmlFor="description"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      Keywords
                    </FormLabel>
                    <Input
                      id="description"
                      type="text"
                      placeholder="keyword1, keyword2, keyword3"
                      value={values.description}
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
