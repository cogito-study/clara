import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';

/* eslint-disable complexity */
// TODO: Localize
export const ChangeLanguage = () => {
  const { errors, touched, handleSubmit } = useFormik({
    initialValues: {
      language: 'English',
    },
    validateOnChange: false,
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
        Change preferred language
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
              <FormControl isInvalid={errors.language && touched.language ? true : false}>
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  Choose your preferred language
                </FormLabel>
                <Select aria-labelledby="language-picker" id="language" borderRadius={0}>
                  <option value="en">English</option>
                  <option value="hu">Hungarian</option>
                </Select>

                <FormErrorMessage fontSize={14}>{errors.language}</FormErrorMessage>
              </FormControl>
            </Box>
            <Flex justify="flex-end">
              <Button
                isLoading={false}
                variantColor="teal"
                borderRadius={0}
                type="submit"
                variant="solid"
                color="blue.800"
              >
                save
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
