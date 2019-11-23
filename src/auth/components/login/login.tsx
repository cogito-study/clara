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
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/use-auth';
import { authRoute } from '../../utils/auth-route';

// TODO: Localize
export const Login = () => {
  const { login, isLoading } = useAuth();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async ({ email, password }, { resetForm }) => {
      resetForm();
      login(email, password);
    },
  });

  return (
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
      <Heading fontSize="lg" color="blue.800">
        Login
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box h={100}>
          <FormControl isInvalid={errors.email && touched.email ? true : false}>
            <FormLabel htmlFor="email" color="blue.800">
              Email
            </FormLabel>
            <Input
              id="email"
              type="text"
              placeholder="love@learning.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.email}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box h={100}>
          <FormControl isInvalid={errors.password && touched.password ? true : false}>
            <FormLabel htmlFor="password" color="blue.800">
              Password
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

        <Button
          isLoading={isLoading}
          mt={4}
          variantColor="teal"
          width="100%"
          borderRadius={0}
          type="submit"
          variant="solid"
          color="blue.800"
        >
          login
        </Button>
      </form>
      <RouterLink to={authRoute({ path: 'forgot-password' })}>
        <Button variant="ghost" variantColor="teal" color="teal.700" size="sm" borderRadius={0}>
          forgot your password?
        </Button>
      </RouterLink>
    </Flex>
  );
};
