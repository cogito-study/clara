import {
  Box,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Icon,
  Heading,
  Text,
  Link,
} from '@chakra-ui/core';
import React, { FC } from 'react';
import { theme as baseTheme } from '@chakra-ui/core';

export type MainMenuProps = {
  subjects?: Subject[];
};

export type Subject = {
  label: string;
  link: string;
};

export const MainMenu: FC<MainMenuProps> = ({ subjects }) => {
  // const { onOpen, onClose } = useDisclosure();
  console.log(baseTheme);
  return (
    <Drawer placement={'left'} isOpen={true} size="xs">
      <DrawerOverlay />
      <DrawerContent bg={'blue.700'}>
        <DrawerBody p={0}>
          <Box pos="absolute" bg="blue.800" width="50px" height="100%" zIndex={-1} />
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
                <Icon name="file-text" mx="9px" size="32px" color={'blue.100'} />
                <Heading
                  as="h4"
                  fontSize="md"
                  fontWeight="semibold"
                  color="white"
                  textTransform="lowercase"
                  px={3}
                  py={2}
                >
                  News feed
                </Heading>
              </Flex>

              <Flex mt="16px" flexDirection="row" alignItems="flex-start">
                <Icon name="book" mx="9px" size="32px" color={'blue.100'} />
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
                    {subjects ? (
                      subjects.map(({ label }) => (
                        <Link
                          mt={1}
                          key={label}
                          fontSize="sm"
                          color="white"
                          href="#"
                          _hover={{ color: 'blue.200' }}
                          _active={{ color: 'teal.500' }}
                        >
                          {label}
                        </Link>
                      ))
                    ) : (
                      <Text fontSize="sm" color="white">
                        No subjects available
                      </Text>
                    )}
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
