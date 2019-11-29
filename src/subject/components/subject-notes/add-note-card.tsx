import { Flex, Heading, Icon, PseudoBox } from '@chakra-ui/core';
import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

export const AddNoteCard = ({ onClick }: { onClick: () => void }) => (
  <PseudoBox
    cursor="pointer"
    bg="transparent"
    h={200}
    p={3}
    borderWidth={1}
    borderColor="grey.100"
    onClick={onClick}
    transition="transform 0.2s"
    _hover={{ transition: 'transform 0.2s', transform: 'scale(1.02)', borderColor: 'teal.500' }}
    _focus={{ borderColor: 'teal.500' }}
  >
    <Flex mt={1} direction="column" align="center" justify="center" size="full">
      <Icon as={FiPlusCircle} color="teal.500" size="65px" />
      <Heading fontSize="md" fontWeight="semibold" color="grey.600" lineHeight="normal" mt={5}>
        add new note
      </Heading>
    </Flex>
  </PseudoBox>
);
