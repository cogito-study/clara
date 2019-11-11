import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  useDisclosure,
} from '@chakra-ui/core';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { subjectRoute } from '../../../subject/utils/subject-route';
import { useMySubjectsQuery } from './graphql/my-subjects-query.generated';

export const MainMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display={['initial', 'initial', 'none']} pos="relative">
        <Box
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bg="blue.800"
          zIndex={1}
          display={['initial', 'intial', 'none']}
        >
          <IconButton
            size="lg"
            p={1}
            icon="menu"
            variantColor="teal"
            variant="ghost"
            aria-label="Menu"
            onClick={onOpen}
          >
            {/* TODO: Localize */}
            Menu
          </IconButton>
        </Box>
        <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
          <DrawerContent>
            <DrawerCloseButton color="teal.400" />
            <DrawerBody p={0}>
              <MainMenuBase />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box display={['none', 'none', 'initial']} pos="relative" height="100vh">
        <MainMenuBase />
      </Box>
    </>
  );
};

export const MainMenuBase = () => {
  const { data } = useMySubjectsQuery();

  return (
    <Flex bg="blue.700" width={['initial', 'initial', '250px']} height="100vh">
      <Box pos="absolute" top="0" left="0" bottom="0" bg="blue.800" width="50px" zIndex={0} />
      <Flex flexDirection="column" height="100vh" justifyContent="space-between" py={4}>
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="row"
          alignContent="row"
          zIndex={2}
        >
          <Icon mx="9px" name="cogito" size="32px" color="white" />
          <Flex mt="64px" flexDirection="row" alignItems="flex-start">
            <Icon name="file-text" mx="9px" size="32px" color="blue.100" />
            <Heading
              as="h4"
              fontSize="md"
              fontWeight="semibold"
              color="white"
              textTransform="lowercase"
              px={3}
              py={2}
            >
              {/* TODO: Localize */}
              News feed
            </Heading>
          </Flex>

          <Flex mt="16px" flexDirection="row" alignItems="flex-start">
            <Icon name="book" mx="9px" size="32px" color="blue.100" />
            <Box px={3} py={2}>
              <Heading
                as="h4"
                fontSize="md"
                fontWeight="semibold"
                color="blue.100"
                textTransform="lowercase"
              >
                Subjects
              </Heading>
              <Flex flexDirection="column" mt={1} ml={1}>
                {data &&
                  data.me.studiedSubjects &&
                  data.me.studiedSubjects.map(({ code, name }) => (
                    <Link
                      // @ts-ignore
                      as={ReactRouterLink}
                      mt={1}
                      key={code}
                      to={subjectRoute({ path: 'subjects', subjectCode: code })}
                      fontSize="sm"
                      color="white"
                      _hover={{ color: 'blue.200' }}
                      _active={{ color: 'teal.500' }}
                    >
                      {name}
                    </Link>
                  ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <Avatar size="sm" mx="9px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Icon
            mt="16px"
            mx="9px"
            name="log-out"
            size="32px"
            color="blue.100"
            transform="rotate(-180deg)"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
