import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  PseudoBox,
} from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Head } from '../../../core/components';
import { useErrorToast, useFormValidationSchema } from '../../../core/hooks';
import { socialRoute } from '../../../social/utils/social-route';
import { useAuthToken } from '../../hooks';
import { authRoute } from '../../utils/auth-route';
import { useLoginUserMutation } from './graphql/login-user-mutation.generated';

export const Login = () => {
  const { t } = useTranslation(['auth', 'core']);
  const history = useHistory();
  const { setAuthToken } = useAuthToken();
  const errorToast = useErrorToast();

  const { emailSchema } = useFormValidationSchema();
  const validationSchema = emailSchema.shape({
    password: Yup.string().required(t('core:form.password.validation.required')),
  });

  const [login, { loading }] = useLoginUserMutation();

  const { register, handleSubmit, errors, reset } = useForm({ validationSchema });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const { data } = await login({ variables: { email, password } });

      if (data) {
        setAuthToken(data.login.token);
        const redirectPath =
          history.location.state?.from?.pathname ?? socialRoute({ path: 'feed' });
        history.push(redirectPath);
        window.location.reload(); // TODO: Fix hack when apollo supports websocket reconnection
      }
    } catch (error) {
      errorToast(error);
    } finally {
      reset();
    }
  });

  return (
    <>
      <Head title={t('login.title')} />
      <Flex
        h={415}
        py={8}
        px={[4, 8, 12]}
        bg="#fff"
        borderWidth={1}
        justify="space-between"
        align="center"
        direction="column"
      >
        <Heading fontSize="lg" color="blue.800" textAlign="center">
          {t('login.title')}
        </Heading>
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <Box mb={4}>
            <FormControl isInvalid={errors.email && true}>
              <FormLabel htmlFor="email" color="blue.800">
                {t('core:form.email.label')}
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder={t('core:form.email.placeholder')}
                ref={register}
                borderRadius={0}
              />
              <FormErrorMessage fontSize={14}>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </Box>

          <Box mb={4}>
            <FormControl isInvalid={errors.password && true}>
              <FormLabel htmlFor="password" color="blue.800">
                {t('core:form.password.label')}
              </FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="*******"
                ref={register}
                borderRadius={0}
              />
              <FormErrorMessage fontSize={14}>{errors.password?.message}</FormErrorMessage>
              <FormHelperText color="teal.700" borderRadius={0} textTransform="lowercase">
                <Link to={authRoute({ path: 'forgot-password' })}>{t('button.forgot')}</Link>
              </FormHelperText>
            </FormControl>
          </Box>

          <Button
            isLoading={loading}
            mt={4}
            variantColor="teal"
            width="100%"
            borderRadius={0}
            type="submit"
            variant="solid"
            color="blue.800"
          >
            {t('button.login')}
          </Button>
        </form>

        <Link to={authRoute({ path: 'register' })}>
          <PseudoBox
            p={2}
            textAlign="center"
            fontFamily="heading"
            fontWeight="semibold"
            color="teal.700"
            borderRadius={0}
            textTransform="lowercase"
            _hover={{ bg: 'teal.50' }}
          >
            {t('button.register')}
          </PseudoBox>
        </Link>
      </Flex>
    </>
  );
};
