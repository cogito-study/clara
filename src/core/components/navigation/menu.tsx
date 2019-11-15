import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  PseudoBox,
  useDisclosure,
} from '@chakra-ui/core';
import React from 'react';
import { FiBook, FiFileText, FiLogOut, FiMenu } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks/use-auth';
import { socialRoute } from '../../../social/utils/social-route';
import { isSubjectsPath, subjectRoute } from '../../../subject/utils/subject-route';
import { useTheme } from '../../hooks/use-theme';
import { StudiedSubjectFragment } from '../layout/graphql/studied-subject-fragment.generated';
import { profileRoute, isProfilePath } from '../../../profile/utils/profile-route';

export type MainMenuProps = {
  title?: string;
  subjects?: ReadonlyArray<StudiedSubjectFragment>;
};

export const MainMenu = ({ title, subjects }: MainMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display={['initial', 'initial', 'initial', 'none']} pos="relative">
        <Box
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bg="blue.800"
          zIndex={10}
          display={['initial', 'intial', 'initial', 'none']}
          height={12}
        >
          <Heading
            pos="absolute"
            left="50%"
            transform="translate(-50%, -50%)"
            top={6}
            fontSize="sm"
            fontWeight="semibold"
            color="white"
          >
            {title}
          </Heading>
          <IconButton
            as={FiMenu}
            size="lg"
            p={2}
            variantColor="teal"
            variant="link"
            cursor="pointer"
            aria-label="Menu"
            onClick={onOpen}
          />
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="left"
          // @ts-ignore
          size={['full', 'full', '320px']}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color="teal.400" />
            <DrawerBody bg="blue.700" p={0}>
              <MainMenuBase subjects={subjects} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box display={['none', 'none', 'none', 'initial']} pos="relative" height="100vh">
        <MainMenuBase subjects={subjects} />
      </Box>
    </>
  );
};

export const MainMenuBase = ({ subjects }: Pick<MainMenuProps, 'subjects'>) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { colors } = useTheme();

  const navLinkStyles = {
    style: { color: colors.white },
    activeStyle: { color: colors.teal[500] },
  };

  return (
    <Flex bg="blue.700" width={['initial', 'initial', '250px']} height="100vh" pos="fixed">
      <Box pos="absolute" top="0" left="0" bottom="0" bg="blue.800" width={12} zIndex={0} />
      <Flex flexDirection="column" height="100vh" justifyContent="space-between" py={4}>
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="row"
          alignContent="row"
          zIndex={2}
        >
          <Icon
            mx={2}
            // @ts-ignore
            name="cogito"
            size="32px"
            color="white"
          />
          <NavLink to={socialRoute({ path: 'feed' })} {...navLinkStyles}>
            <Flex mt={16} direction="row" align="flex-start">
              <Icon as={FiFileText} mx={2} size="32px" />
              <Heading
                as="h4"
                fontSize="md"
                fontWeight="semibold"
                textTransform="lowercase"
                px={3}
                py={2}
              >
                {/* TODO: Localize */}
                News feed
              </Heading>
            </Flex>
          </NavLink>

          <Flex mt={4} flexDirection="row" alignItems="flex-start">
            <Icon
              as={FiBook}
              mx={2}
              size="32px"
              color={isSubjectsPath(location) ? 'teal.500' : 'blue.100'}
            />
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
                {subjects &&
                  subjects.map(({ code, name }) => (
                    <NavLink
                      key={code}
                      to={subjectRoute({ path: 'subjects', subjectCode: code })}
                      {...navLinkStyles}
                    >
                      <PseudoBox
                        mt={2}
                        fontSize="sm"
                        _hover={{ color: 'blue.200' }}
                        _active={{ color: 'teal.500' }}
                      >
                        {name}
                      </PseudoBox>
                    </NavLink>
                  ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <NavLink to={profileRoute({ path: 'profile' })}>
            <Avatar
              size="sm"
              mx={2}
              showBorder={isProfilePath(location)}
              borderColor="teal.500"
              name={user && user.fullName}
              src={user && user.profilePictureURL}
            />
          </NavLink>
          <IconButton
            aria-label="Log out"
            variant="link"
            as={FiLogOut}
            mt={4}
            mx={2}
            size="sm"
            cursor="pointer"
            color="blue.100"
            transform="rotate(-180deg)"
            onClick={() => logout()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
