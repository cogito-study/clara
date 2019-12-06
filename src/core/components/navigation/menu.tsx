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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PseudoBox,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBook, FiFileText, FiInfo, FiLogOut, FiMenu, FiPlusCircle } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks/use-auth';
import { isProfilePath, profileRoute } from '../../../profile/utils/profile-route';
import { socialRoute } from '../../../social/utils/social-route';
import { isSubjectsPath, subjectRoute } from '../../../subject/utils/subject-route';
import { useTheme } from '../../hooks/use-theme';
import { StudiedSubjectFragment } from '../layout/graphql/studied-subject-fragment.generated';
import { MenuSubjectsPlaceholder, MobileMenuTitlePlaceholder } from './menu.placeholder';
import { SubjectSelector } from './subject-selector';

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
  const [isSubjectSelectorOpen, setSubjectSelectorOpen] = useState(false);

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
            <Flex mt={16} direction="row" align="start" w="100%">
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
              <Flex align="center">
                <Heading
                  as="h4"
                  fontSize="md"
                  fontWeight="semibold"
                  color="blue.100"
                  textTransform="lowercase"
                >
                  {t('menu.subjects')}
                </Heading>
                <IconButton
                  aria-label=""
                  as={FiPlusCircle}
                  mx={3}
                  size="xs"
                  cursor="pointer"
                  variant="ghost"
                  bg="transparent"
                  _hover={{ transform: 'scale(1.1)' }}
                  _active={{ color: 'teal.700' }}
                  color="teal.300"
                  onClick={() => setSubjectSelectorOpen(true)}
                />
                <SubjectSelector
                  isOpen={isSubjectSelectorOpen}
                  isLoading={false}
                  onClose={() => setSubjectSelectorOpen(false)}
                />
              </Flex>
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
        <Flex flexDirection="column" w="48px" align="center">
          <NavLink to={profileRoute({ path: 'profile' })}>
            <Avatar
              size="sm"
              mb={5}
              showBorder={isProfilePath(location)}
              name={user?.fullName}
              src={user?.profilePictureURL}
              borderWidth={2}
              borderColor="blue.50"
            />
          </NavLink>
          <Menu>
            <MenuButton mb={5}>
              <IconButton
                aria-label=""
                as={FiInfo}
                size="sm"
                cursor="pointer"
                variant="ghost"
                bg="transparent"
                _hover={{ transform: 'scale(1.1)' }}
                _active={{ color: 'blue.300' }}
                color="blue.50"
              />
            </MenuButton>
            <MenuList borderRadius="none" zIndex={10}>
              <MenuItem cursor="pointer">
                <NavLink to="/terms-of-use" {...navLinkStyles}>
                  <Text color="blue.800" fontWeight="semibold">
                    {t('menu.termsOfUse')}
                  </Text>
                </NavLink>
              </MenuItem>
              <MenuItem cursor="pointer">
                <NavLink to="/privacy-policy" {...navLinkStyles}>
                  <Text color="blue.800" fontWeight="semibold">
                    {t('menu.privacyPolicy')}
                  </Text>
                </NavLink>
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            aria-label="Log out"
            variant="link"
            as={FiLogOut}
            size="sm"
            cursor="pointer"
            color="blue.50"
            transform="rotate(-180deg)"
            _active={{ color: 'blue.300' }}
            onClick={() => logout()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
