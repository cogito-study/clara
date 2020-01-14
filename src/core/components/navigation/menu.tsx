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
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PseudoBox,
  PseudoBoxProps,
  useDisclosure,
} from '@chakra-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBook, FiFileText, FiInfo, FiLogOut, FiMenu } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { useLogout } from '../../../auth/hooks';
import { isProfilePath, profileRoute } from '../../../profile/utils/profile-route';
import { socialRoute } from '../../../social/utils/social-route';
import { isSubjectsPath, subjectRoute } from '../../../subject/utils/subject-route';
import { useTheme } from '../../hooks/';
import { useMenuDataQuery } from './graphql/menu-data-query.generated';
import { MenuSubjectsPlaceholder, MobileMenuTitlePlaceholder } from './menu.placeholder';

export interface MainMenuProps {
  title?: string;
  titleLoading: boolean;
}

export const MainMenu = ({ title, titleLoading }: MainMenuProps) => {
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
            <Heading
              flex="1"
              fontSize="sm"
              fontWeight="semibold"
              color="white"
              lineHeight="normal"
              textAlign="center"
            >
              {title}
            </Heading>
          )}
          <Box size={12} p={2} />
        </Flex>
        <Drawer isOpen={isOpen} placement="left" isFullHeight size="xs" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton borderRadius={0} color="teal.400" />
            <DrawerBody bg="blue.700" p={0}>
              <MainMenuBase />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box display={['none', 'none', 'none', 'initial']} pos="relative" height="100vh">
        <MainMenuBase />
      </Box>
    </>
  );
};

MainMenu.defaultProps = {
  titleLoading: false,
} as Partial<MainMenuProps>;

export const MainMenuBase = () => {
  const { t } = useTranslation('core');
  const location = useLocation();
  const logout = useLogout();
  const { data, loading } = useMenuDataQuery();
  const { colors } = useTheme();

  const navLinkStyles = {
    style: { color: colors.white },
    activeStyle: { color: colors.teal[500] },
  };

  return (
    <Flex bg="blue.700" width={['100%', '100%', '100%', '250px']} h="100vh" pos="fixed">
      <Box pos="absolute" top="0" left="0" bottom="0" bg="blue.800" width={12} zIndex={0} />
      <Flex flexDirection="column" h="100vh" w="100%" justifyContent="space-between" py={4}>
        <Flex w="100%" flexDirection="column" justifyContent="row" alignContent="row" zIndex={2}>
          <Icon mx={2} name="cogito" size="32px" color="white" />
          <NavLink to={socialRoute({ path: 'feed' })} {...navLinkStyles}>
            <MenuItemHover>
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
            </MenuItemHover>
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
              {loading ? (
                <MenuSubjectsPlaceholder />
              ) : (
                <Flex flexDirection="column" mt={1} ml={1}>
                  {data?.me.subjects?.map(({ code, name }) => (
                    <NavLink
                      key={code}
                      to={subjectRoute({ path: 'subjects', subjectCode: code })}
                      {...navLinkStyles}
                      exact={false}
                    >
                      <MenuItemHover mt={2} ml={[2, 2, 0]} fontSize={['18px', '18px', 'sm']}>
                        {name}
                      </MenuItemHover>
                    </NavLink>
                  ))}
                </Flex>
              )}
            </Box>
          </Flex>
        </Flex>
        <Flex flexDirection="column" w="48px" align="center" mb={[24, 0]}>
          <PseudoBox transition="all 0.2s ease-in-out" _hover={{ transform: 'scale(1.1)' }}>
            <NavLink to={profileRoute({ path: 'profile' })}>
              <Avatar
                size="sm"
                mb={5}
                name={data?.me.fullName}
                src={data?.me.profilePictureURL}
                borderWidth={2}
                borderColor="teal.500"
                showBorder={isProfilePath(location)}
              />
            </NavLink>
          </PseudoBox>
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
              <MenuItem>
                <Link
                  color="blue.800"
                  fontWeight="semibold"
                  href="https://cogito.study/terms-conditions"
                  isExternal={true}
                  _hover={{ textDecor: 'none' }}
                >
                  {t('menu.termsOfUse')}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  color="blue.800"
                  fontWeight="semibold"
                  href="https://cogito.study/privacy-policy"
                  isExternal={true}
                  _hover={{ textDecor: 'none' }}
                >
                  {t('menu.privacyPolicy')}
                </Link>
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
            _hover={{ transform: 'scale(1.1) rotate(-180deg)' }}
            _active={{ color: 'blue.300' }}
            onClick={() => logout()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const MenuItemHover: FC<PseudoBoxProps> = ({ children, ...rest }) => (
  <PseudoBox _hover={{ color: 'teal.300' }} {...rest}>
    {children}
  </PseudoBox>
);
