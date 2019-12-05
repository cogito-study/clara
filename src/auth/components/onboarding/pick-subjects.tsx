import { Button, Checkbox, Flex, FormControl, Heading } from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useEmailValidation, usePasswordValidation } from '../../hooks';

/**
 * TODO:
 * - Localize
 * - Terms and legal link
 * - Validate token
 */
export const PickSubjects = () => {
  const validationSchema = usePasswordValidation().validationSchema.concat(
    useEmailValidation().validationSchema,
  );

  // const { t } = useTranslation(['profile', 'core']);

  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      subjects: [],
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: ({}, { resetForm }) => {
      resetForm();
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
        Select your subjects
      </Heading>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormControl isInvalid={errors.subjects && touched.subjects ? true : false}>
          <Flex direction="column" align="center">
            {[
              { name: 'Subject 1', code: '1' },
              { name: 'Subject 2', code: '2' },
              { name: 'Subject 3', code: '3' },
              { name: 'Subject 4', code: '4' },
              { name: 'Subject 5', code: '5' },
              { name: 'Subject 6', code: '6' },
            ].map(({ code, name }) => (
              <Checkbox
                key={code}
                value={code}
                id="subjects"
                onChange={handleChange}
                size="md"
                variantColor="teal"
                mt={3}
                color="grey.800"
              >
                {name}
              </Checkbox>
            ))}
          </Flex>
        </FormControl>

        <Button
          mt={8}
          variantColor="teal"
          width="100%"
          borderRadius={0}
          type="submit"
          variant="solid"
          color="blue.800"
        >
          save
        </Button>
      </form>
    </Flex>
  );
};
