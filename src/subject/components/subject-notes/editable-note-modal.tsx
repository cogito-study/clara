import {
  Box,
  Button,
  Flex,
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
} from '@chakra-ui/core';
import React from 'react';

type EditableNoteModalProps = {
  title?: string;
  number?: number;
  keywords?: string;
  isLoading: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void;
};

export const EditableNoteModal = ({
  title,
  number,
  keywords,
  isOpen,
  onClose,
}: EditableNoteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <form style={{ width: '100%' }}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="row" h={100}>
              <Box flex="5">
                <FormLabel
                  htmlFor="title"
                  color="grey.800"
                  fontSize={['sm', 'sm', 'md']}
                  fontWeight="bold"
                >
                  {title ? 'Edit the title of the note:' : 'Add title to the note'}
                </FormLabel>
                <Input
                  id="title"
                  defaultValue={title || ''}
                  type="text"
                  placeholder="Awesome title"
                  borderRadius={0}
                />
              </Box>
              <Box ml={3} flex="2">
                <FormLabel
                  htmlFor="description"
                  color="grey.800"
                  fontSize={['sm', 'sm', 'md']}
                  fontWeight="bold"
                >
                  Note number:
                </FormLabel>

                <NumberInput
                  min={1}
                  max={200}
                  // TODO: itt valahogy majd a count+1 cellene legyen ha ujat akar hozzaadni
                  defaultValue={number || 1}
                >
                  <NumberInputField borderRadius={0} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Flex>
            <Box h={100}>
              <FormLabel
                htmlFor="description"
                color="grey.800"
                fontSize={['sm', 'sm', 'md']}
                fontWeight="bold"
              >
                {keywords ? 'Change keywords of the note:' : 'Add keywords to the note'}
              </FormLabel>
              <Input
                id="description"
                type="text"
                placeholder="keyword1, keyword2, keyword3"
                defaultValue={keywords || ''}
                borderRadius={0}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={false}
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
  );
};
