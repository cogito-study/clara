import { Button, ButtonGroup, Flex, Heading, Icon, Link, Text } from '@chakra-ui/core';
import { captureException } from '@sentry/browser';
import React, { FC, useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import background from '../../assets/background-pattern.svg';

export const ErrorPage: FC<FallbackProps> = (props) => {
  const { t } = useTranslation('core');

  useEffect(() => {
    captureException({ ...props });
  }, [props]);

  return (
    <Flex direction="column" h="100vh">
      <Flex bg="#fff" borderColor="blue.100" borderWidth={1} h={16} align="center" justify="center">
        <RouterLink to="/">
          <Icon color="blue.800" size="80px" name="cogito-with-text" />
        </RouterLink>
      </Flex>
      <Flex
        bg="white"
        backgroundImage={`url(${background})`}
        backgroundPosition="center"
        backgroundRepeat="repeat"
        flex="1"
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        p={4}
      >
        <Icon as={FiAlertTriangle} color="blue.800" w={[80, 80, 120]} h={[80, 80, 120]} />
        <Heading as="h1" lineHeight="base" fontSize={['lg', 'lg', '2xl']} color="blue.800" mt={6}>
          {t('pages.error.title')}
        </Heading>
        <Text color="grey.800" lineHeight="tall" maxW="lg" mt={6}>
          {t('pages.error.description')}
        </Text>
        <ButtonGroup spacing={4} mt={10}>
          <Button
            variantColor="teal"
            color="blue.800"
            borderRadius={0}
            onClick={() => window.location.reload()}
          >
            {t('pages.error.button.tryAgain')}
          </Button>
          <Link href="mailto:support@cogito.study" _hover={{ textDecor: 'none' }}>
            <Button
              variant="outline"
              variantColor="teal"
              color="blue.800"
              borderRadius={0}
              borderColor="teal.500"
              borderWidth={2}
            >
              {t('pages.error.button.report')}
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
