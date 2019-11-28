import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

/* eslint-disable complexity */
// TODO: Localize
export const ChangePassword = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      newPasswordRetype: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      password: Yup.string().required('Password is required'),
      newPassword: Yup.string()
        .min(7, 'Password has to be longer than 7 characters!')
        .required('Password is required'),
      newPasswordRetype: Yup.string().test('passwords-match', 'Passwords must match', function(
        value,
      ) {
        return this.parent.newPassword === value;
      }),
    }),
    onSubmit: async ({}, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <Box width="full">
      <Heading
        fontSize={['md', 'lg']}
        fontWeight="bold"
        maxWidth="80%"
        color="blue.700"
        lineHeight="normal"
        mt={[6, 6, 6, 8]}
        mb={[3, 3, 3, 4]}
      >
        Change Password
      </Heading>
      <Flex
        borderWidth="1px"
        borderColor="grey.100"
        bg="#fff"
        p={[4, 4, 5]}
        direction="column"
        align="center"
      >
        <Box maxW="480px" size="full">
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box h={100}>
              <FormControl isInvalid={errors.password && touched.password ? true : false}>
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  Current password
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="*******"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.password}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box h={100}>
              <FormControl isInvalid={errors.newPassword && touched.newPassword ? true : false}>
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  New password
                </FormLabel>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="At least 7 characters"
                  value={values.newPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.newPassword}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box h={100}>
              <FormControl
                isInvalid={errors.newPasswordRetype && touched.newPasswordRetype ? true : false}
              >
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  Repeat new password
                </FormLabel>
                <Input
                  id="newPasswordRetype"
                  type="password"
                  placeholder="Re-enter your password"
                  value={values.newPasswordRetype}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.newPasswordRetype}</FormErrorMessage>
              </FormControl>
            </Box>
            <Flex justify="flex-end">
              <Button
                variantColor="teal"
                borderRadius={0}
                type="submit"
                variant="outline"
                color="blue.800"
                borderColor="teal.500"
                borderWidth="2px"
              >
                cancel
              </Button>
              <Button
                ml={3}
                isLoading={false}
                variantColor="teal"
                borderRadius={0}
                type="submit"
                variant="solid"
                color="blue.800"
              >
                update password
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
