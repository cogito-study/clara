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
  Text,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/use-auth';
import { Feedback } from '../feedback/feedback';

/* eslint-disable complexity */
// TODO: Localize
export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [hasSubmitted, setSubmitted] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { email: '' },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    }),
    onSubmit: async ({ email }) => {
      setSubmitted(true);
      forgotPassword(email);
    },
  });

  return hasSubmitted ? (
    <Feedback
      title="Mail sent"
      icon={<Icon as={FiSend} color="blue.600" size="96px" />}
      description="A message has been sent to you by email with instructions on how to reset your password."
    />
  ) : (
    <Flex
      h={360}
      py={8}
      px={[4, 8, 12]}
      bg="#fff"
      borderWidth={1}
      justify="space-between"
      align="center"
      direction="column"
    >
      <Heading fontSize="lg" color="blue.800">
        Password Reset
      </Heading>
      <Text textAlign="center" color="grey.800">
        Enter your e-mail address! We send you a mail with a link to reset your password.
      </Text>

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

        <Button
          mt={4}
          variantColor="teal"
          width="100%"
          borderRadius={0}
          type="submit"
          variant="solid"
          color="blue.800"
        >
          send e-mail
        </Button>
      </form>
    </Flex>
  );
};
