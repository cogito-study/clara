import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useAuth, usePasswordValidation, useRouteQueryParams } from '../../hooks';
import { authRoute } from '../../utils/auth-route';
import { Feedback } from '../feedback/feedback';
import { PasswordUserInfo } from '../password-user-info/password-user-info';

/**
 * TODO:
 * - Localize
 * - Terms and legal link
 * - Validate token
 */
export const ResetPassword = () => {
  const { t } = useTranslation(['auth', 'core']);
  const [hasSubmitted, setSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const history = useHistory();
  const { validationSchema } = usePasswordValidation();
  const { token } = useRouteQueryParams<{ token: string }>();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
      legalAccepted: false,
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: ({ password }) => {
      resetPassword(password, token);
      setSubmitted(true);
    },
  });

  return hasSubmitted ? (
    <Feedback
      title={t('resetPassword.feedback.title')}
      icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
      description={t('resetPassword.feedback.description')}
      buttonLabel={t('button.login')}
      onButtonClick={() => history.push(authRoute({ path: 'login' }))}
    />
  ) : (
    <Flex
      h={460}
      py={8}
      px={[4, 8, 12]}
      bg="#fff"
      borderWidth={1}
      justify="space-between"
      align="center"
      direction="column"
    >
      <Heading as="h2" fontSize="lg" color="blue.800">
        {t('resetPassword.title')}
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

        <Button
          mt={6}
          variantColor="teal"
          width="100%"
          borderRadius={0}
          type="submit"
          variant="solid"
          color="blue.800"
        >
          {t('button.reset')}
        </Button>
      </form>
    </Flex>
  );
};
