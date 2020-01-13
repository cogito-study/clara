import {
  Box,
  Button,
  Flex,
  FormControl,
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
import { SubjectNoteDataFragment } from './graphql/subject-note-data-fragment.generated';

type EditNoteModalProps = {
  titleLabel: string;
  note?: SubjectNoteDataFragment;
  isLoading: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onEdit: (content: Partial<SubjectNoteDataFragment>) => void;
};

type EditNoteModalForm = {
  title: string;
  description: string;
  number: string;
};

export const EditNoteModal = ({
  titleLabel,
  note,
  isLoading,
  isOpen,
  onClose,
  onEdit,
}: EditNoteModalProps) => {
  const { t } = useTranslation(['subject', 'core']);
  const { register, handleSubmit } = useForm<EditNoteModalForm>({
    defaultValues: {
      title: note?.title,
      description: note?.description,
      number: note?.number.toString(),
    },
  });

  const onSubmit = handleSubmit(({ number, ...rest }) => {
    onEdit({ number: parseInt(number), ...rest });
  });

  return (
    <Scale in={isOpen}>
      {(styles) => (
        <Modal isOpen={isOpen} onClose={onClose} size={['full', 'full', 'lg']} isCentered>
          <ModalOverlay opacity={styles.opacity} />
          <ModalContent mx={[2, 'auto']} {...styles}>
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
                  <FormControl isRequired flex={['initial', 'initial', 5]} h={100}>
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
                      ref={register({ required: true })}
                      placeholder={t('notes.modal.title.placeholder')}
                      borderRadius={0}
                    />
                  </FormControl>

                  <FormControl isRequired flex={['initial', 'initial', 2]} ml={[0, 0, 2]} h={100}>
                    <FormLabel
                      htmlFor="number"
                      color="blue.800"
                      fontSize={['sm', 'sm', 'md']}
                      fontWeight="bold"
                    >
                      {t('notes.modal.number.label')}
                    </FormLabel>
                    <Input
                      name="number"
                      type="number"
                      ref={register({ required: true })}
                      borderRadius={0}
                    />
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
