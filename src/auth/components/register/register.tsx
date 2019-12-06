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
  Select,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  useAuth,
  useEmailValidation,
  usePasswordValidation,
  useRouteQueryParams,
} from '../../hooks';
import { authRoute } from '../../utils/auth-route';

/**
 * TODO:
 * - Localize
 * - Terms and legal link
 * - Validate token
 */
export const Register = () => {
  const { activateUser, isLoading } = useAuth();
  const validationSchema = usePasswordValidation().validationSchema.concat(
    useEmailValidation().validationSchema,
  );

  const { token } = useRouteQueryParams<{ token: string }>();
  const { t } = useTranslation(['auth', 'core']);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      language: 'english',
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
      py={8}
      px={[4, 8, 12]}
      bg="#fff"
      borderWidth={1}
      justify="space-between"
      align="center"
      direction="column"
    >
      <Heading as="h2" fontSize="lg" color="blue.800" mb={5}>
        {t('register.title')}
      </Heading>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box h={100}>
          <FormControl isInvalid={errors.firstName && touched.firstName ? true : false}>
            <FormLabel htmlFor="firstName" color="blue.800">
              {t('core:form.firstName.label')}
            </FormLabel>
            <Input
              id="firstName"
              type="text"
              placeholder={t('core:form.firstName.placeholder')}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.email}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box h={100}>
          <FormControl isInvalid={errors.lastName && touched.lastName ? true : false}>
            <FormLabel htmlFor="lastName" color="blue.800">
              {t('core:form.lastName.label')}
            </FormLabel>
            <Input
              id="lastName"
              type="text"
              placeholder={t('core:form.lastName.placeholder')}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.email}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box h={100}>
          <FormControl isInvalid={errors.email && touched.email ? true : false}>
            <FormLabel htmlFor="email" color="blue.800">
              {t('core:form.email.label')}
            </FormLabel>
            <Input
              id="email"
              type="text"
              placeholder={t('core:form.email.placeholder')}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.email}</FormErrorMessage>
          </FormControl>
        </Box>
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

        <Box h={100}>
          <FormControl isInvalid={errors.language && touched.language ? true : false}>
            <FormLabel htmlFor="language" color="blue.800" fontSize={['sm', 'sm', 'md']}>
              {t('core:form.preferredLanguage.label')}
            </FormLabel>
            <Select
              aria-labelledby="language-picker"
              id="language"
              // isDisabled={changeLanguageLoading}
              borderRadius={0}
              onChange={handleChange}
            >
              {[
                { name: 'english', code: 'en' },
                { name: 'hungarian', code: 'hu' },
              ].map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </Select>
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
