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
export const ChangeEmail = ({ email }: { email: string }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
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
        Change Email
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
          <Flex align="center" mb={4} wrap="wrap">
            <Heading fontSize={['sm', 'sm', 'md']} fontWeight={500} pr={1} lineHeight="normal">
              Your email address is
            </Heading>
            <Heading
              color="blue.800"
              fontSize={['sm', 'sm', 'md']}
              fontWeight={500}
              lineHeight="normal"
            >
              {email}
            </Heading>
          </Flex>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box h="100px">
              <FormControl isInvalid={errors.email && touched.email ? true : false}>
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  New email address
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
                update email
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
