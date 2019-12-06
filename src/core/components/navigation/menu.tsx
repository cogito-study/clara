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
import { useTranslation } from 'react-i18next';
import { FiBook, FiFileText, FiLogOut, FiMenu } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks/use-auth';
import { isProfilePath, profileRoute } from '../../../profile/utils/profile-route';
import { socialRoute } from '../../../social/utils/social-route';
import { isSubjectsPath, subjectRoute } from '../../../subject/utils/subject-route';
import { useTheme } from '../../hooks/use-theme';
import { StudiedSubjectFragment } from '../layout/graphql/studied-subject-fragment.generated';
import { MenuSubjectsPlaceholder, MobileMenuTitlePlaceholder } from './menu.placeholder';

export interface MainMenuProps {
  title?: string;
  titleLoading: boolean;
  subjects?: ReadonlyArray<StudiedSubjectFragment>;
  subjectsLoading: boolean;
}

export const MainMenu = ({ title, titleLoading, ...rest }: MainMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display={['initial', 'initial', 'initial', 'none']} pos="relative">
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bg="blue.800"
          zIndex={10}
          display={['flex', 'flex', 'flex', 'none']}
          height={12}
        >
          <IconButton
            as={FiMenu}
            size="lg"
            p={2}
            variantColor="teal"
            variant="link"
            cursor="pointer"
            aria-label="Menu"
            borderRadius={0}
            onClick={onOpen}
          />
          {titleLoading ? (
            <MobileMenuTitlePlaceholder />
          ) : (
            <Heading flex="1" fontSize="sm" fontWeight="semibold" color="white" textAlign="center">
              {title}
            </Heading>
          )}
          <Box size={12} p={2} />
        </Flex>
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
              <MainMenuBase {...rest} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box display={['none', 'none', 'none', 'initial']} pos="relative" height="100vh">
        <MainMenuBase {...rest} />
      </Box>
    </>
  );
};

MainMenu.defaultProps = {
  titleLoading: false,
  subjectsLoading: false,
} as Partial<MainMenuProps>;

export const MainMenuBase = ({
  subjects,
  subjectsLoading,
}: Pick<MainMenuProps, 'subjects' | 'subjectsLoading'>) => {
  const { t } = useTranslation('core');
  const { user, logout } = useAuth();
  const location = useLocation();
  const { colors } = useTheme();

  const navLinkStyles = {
    style: { color: colors.white },
    activeStyle: { color: colors.teal[500] },
  };

  return (
    <Flex bg="blue.700" width={['100%', '100%', '100%', '250px']} h="100vh" pos="fixed">
      <Box pos="absolute" top="0" left="0" bottom="0" bg="blue.800" width={12} zIndex={0} />
      <Flex flexDirection="column" h="100vh" w="100%" justifyContent="space-between" py={4}>
        <Flex
          h="100%"
          w="100%"
          flexDirection="column"
          justifyContent="row"
          alignContent="row"
          zIndex={2}
        >
          <Icon mx={2} name="cogito" size="32px" color="white" />
          <NavLink to={socialRoute({ path: 'feed' })} {...navLinkStyles}>
            <Flex mt={16} direction="row" align="flex-start" w="100%">
              <Icon as={FiFileText} mx={2} size="32px" />
              <Heading
                as="h4"
                fontSize="md"
                fontWeight="semibold"
                textTransform="lowercase"
                px={3}
                py={2}
              >
                {t('menu.newsFeed')}
              </Heading>
            </Flex>
          </NavLink>

          <Flex mt={4} flexDirection="row" w="100%">
            <Icon
              as={FiBook}
              mx={2}
              size="32px"
              color={isSubjectsPath(location) ? 'teal.500' : 'blue.100'}
            />
            <Box px={3} py={2} flex="1">
              <Heading
                as="h4"
                fontSize="md"
                fontWeight="semibold"
                color="blue.100"
                textTransform="lowercase"
              >
                {t('menu.subjects')}
              </Heading>
              {subjectsLoading ? (
                <MenuSubjectsPlaceholder />
              ) : (
                <Flex flexDirection="column" mt={1} ml={1}>
                  {subjects &&
                    subjects.map(({ code, name }) => (
                      <NavLink
                        key={code}
                        to={subjectRoute({ path: 'subjects-notes', subjectCode: code })}
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
              )}
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
