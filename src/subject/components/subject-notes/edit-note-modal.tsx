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
  Scale,
} from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['subject', 'core']);
  const { register, errors, handleSubmit } = useForm<NoteDataFragment>({
    defaultValues: {
      title: note?.title,
      description: note?.description,
      number: note?.number,
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t('notes.modal.title.validation.required')),
    }),
  });

  const onSubmit = handleSubmit((noteData) => {
    console.log(noteData);
    onEdit({ ...noteData });
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
                <Flex
                  direction={['column', 'column', 'row']}
                  justify="flex-start"
                  h={[200, 200, 100]}
                >
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
                      {t('notes.modal.title.label')}
                    </FormLabel>
                    <Input
                      name="title"
                      type="text"
                      ref={register}
                      placeholder={t('notes.modal.title.placeholder')}
                      borderRadius={0}
                    />
                    <FormErrorMessage fontSize={14}>{errors.title?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl flex={['initial', 'initial', 2]} ml={[0, 0, 2]} h={100}>
                    <FormLabel
                      htmlFor="number"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      {t('notes.modal.number.label')}
                    </FormLabel>
                    <Input name="number" type="number" ref={register} borderRadius={0} />
                  </FormControl>
                </Flex>

                <Box h={100}>
                  <FormControl>
                    <FormLabel
                      htmlFor="description"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      {t('notes.modal.keywords.label')}
                    </FormLabel>
                    <Input
                      name="description"
                      ref={register}
                      type="text"
                      placeholder={t('notes.modal.keywords.placeholder')}
                      borderRadius={0}
                    />
                  </FormControl>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  variant="solid"
                  isLoading={isLoading}
                  variantColor="teal"
                  borderRadius={0}
                  color="blue.800"
                >
                  {t('core:button.save')}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Scale>
  );
};
