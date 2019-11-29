import { Flex, Heading, Icon, PseudoBox } from '@chakra-ui/core';
import { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox/index';
import React, { FC } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

export const AddNoteCard: FC<PseudoBoxProps> = ({ ...rest }) => (
  <PseudoBox
    cursor="pointer"
    bg="transparent"
    borderWidth={1}
    borderColor="grey.100"
    width={['100%', '100%', '300px']}
    transition="transform 0.2s"
    _hover={{ transition: 'transform 0.2s', transform: 'scale(1.02)', borderColor: 'blue.600' }}
    _focus={{ borderColor: 'teal.500' }}
    p={3}
    {...rest}
  >
    <Flex mt={1} direction="column" align="center" justify="center" size="full">
      <Icon as={FiPlusCircle} color="teal.500" size="65px" />
      <Heading fontSize="md" fontWeight="semibold" color="grey.600" lineHeight="normal" mt={5}>
        add new note
      </Heading>
    </Flex>
  </PseudoBox>
);
