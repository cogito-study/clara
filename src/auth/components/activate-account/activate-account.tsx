import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth, usePasswordValidation, useRouteQueryParams } from '../../hooks';
import { authRoute } from '../../utils/auth-route';
import { PasswordUserInfo } from '../password-user-info/password-user-info';

/**
 * TODO:
 * - Localize
 * - Terms and legal link
 * - Validate token
 */
export const ActivateAccount = () => {
  const { activateUser, isLoading } = useAuth();
  const { validationSchema } = usePasswordValidation();
  const { token } = useRouteQueryParams<{ token: string }>();
  const { t } = useTranslation(['auth', 'core']);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
      legalAccepted: false,
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: ({ password }, { resetForm }) => {
      resetForm();
      activateUser(password, token);
    },
  });

  return (
    <Flex
      h={530}
      py={8}
      px={[4, 8, 12]}
      bg="#fff"
      borderWidth={1}
      justify="space-between"
      align="center"
      direction="column"
    >
      <Heading as="h2" fontSize="lg" color="blue.800">
        {t('activation.title')}
      </Heading>

      <PasswordUserInfo token={token} />

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box h={100}>
          <FormControl isRequired isInvalid={errors.password && touched.password ? true : false}>
            <FormLabel htmlFor="password" color="blue.800">
              {t('core:form.password.label')}
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="*******"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.password}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box h={100}>
          <FormControl
            isRequired
            isInvalid={errors.passwordConfirm && touched.passwordConfirm ? true : false}
          >
            <FormLabel htmlFor="passwordConfirm" color="blue.800">
              {t('core:form.password.confirm.label')}
            </FormLabel>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="*******"
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.passwordConfirm}</FormErrorMessage>
          </FormControl>
        </Box>

        <FormControl isInvalid={errors.legalAccepted && touched.legalAccepted ? true : false}>
          <Checkbox
            id="legalAccepted"
            onChange={handleChange}
            onBlur={handleBlur}
            size="sm"
            variantColor="teal"
          >
            {t('core:form.terms.label')}
          </Checkbox>
        </FormControl>

        <Button
          isLoading={isLoading}
          mt={6}
          variantColor="teal"
          width="100%"
          borderRadius={0}
          type="submit"
          variant="solid"
          color="blue.800"
        >
          {t('button.register')}
        </Button>
      </form>
      <RouterLink to={authRoute({ path: 'login' })}>
        <Button variant="ghost" variantColor="teal" color="teal.700" size="sm" borderRadius={0}>
          {t('button.signIn')}
        </Button>
      </RouterLink>
    </Flex>
  );
};
