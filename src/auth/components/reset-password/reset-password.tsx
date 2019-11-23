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
      title="Done"
      icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
      description="Your password has been reset. Please log-in to your account with your new password!"
      buttonLabel="login"
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
        Reset Password
      </Heading>

      <PasswordUserInfo token={token} />

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box h={100}>
          <FormControl isRequired isInvalid={errors.password && touched.password ? true : false}>
            <FormLabel htmlFor="password" color="blue.800">
              Password
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
              Confirm Password
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
          reset password
        </Button>
      </form>
    </Flex>
  );
};
