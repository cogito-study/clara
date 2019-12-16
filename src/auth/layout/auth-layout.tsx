import { Box, Button, Flex, Icon, Link } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageListQuery } from '../../core/graphql/language';
import background from '../assets/auth-bg.svg';

export const AuthLayout: FC = ({ children }) => {
  const { i18n } = useTranslation();
  const { data } = useLanguageListQuery();

  return (
    <Flex direction="column" h="100vh">
      <Flex bg="#fff" borderColor="blue.100" borderWidth={1} h={16} align="center" flexShrink={0}>
        <Box flex="1" ml={[4, 4, 8]}>
          <Link href="https://cogito.study">
            <Icon color="blue.800" size="80px" name="cogito-with-text" />
          </Link>
        </Box>
        <Box mr={[4, 4, 8]}>
          {data?.languages.map(({ code }) => (
            <Button
              key={code}
              size="sm"
              variant={i18n.language === code ? 'outline' : 'ghost'}
              variantColor="teal"
              color="blue.800"
              borderColor="teal.500"
              mr={1}
              borderRadius={0}
              onClick={() => i18n.changeLanguage(code)}
            >
              {code}
            </Button>
          ))}
        </Box>
      </Flex>
      <Flex
        bg="white"
        backgroundImage={`url(${background})`}
        backgroundPosition={['center left', 'center left', 'center']}
        backgroundRepeat="repeat"
        flex="1"
        align={['start', 'start', 'center']}
        justify="center"
        p={4}
      >
        <Box maxW={400} flex="1">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
