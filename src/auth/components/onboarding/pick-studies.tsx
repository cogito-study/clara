import { Box, Button, Flex, FormControl, FormLabel, Heading, Select } from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEmailValidation, usePasswordValidation } from '../../hooks';

/**
 * TODO:
 * - Localize
 * - Terms and legal link
 * - Validate token
 */
export const PickStudies = () => {
  const validationSchema = usePasswordValidation().validationSchema.concat(
    useEmailValidation().validationSchema,
  );

  const { t } = useTranslation(['auth', 'core']);

  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      university: 'BME',
      faculty: 'VIK',
      major: 'mernokinfo',
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
        {t('onboarding.studies.title')}
      </Heading>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box h={100}>
          <FormControl isInvalid={errors.university && touched.university ? true : false}>
            <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
              {t('onboarding.studies.pickers.university')}
            </FormLabel>
            <Select
              aria-labelledby="language-picker"
              id="university"
              borderRadius={0}
              onChange={handleChange}
            >
              {[
                { name: 'Budapest University of Technology', code: 'bme' },
                { name: 'Budapest Semmelweis University', code: 'sote' },
              ].map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box h={100}>
          <FormControl isInvalid={errors.faculty && touched.faculty ? true : false}>
            <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
              {t('onboarding.studies.pickers.faculty')}
            </FormLabel>
            <Select aria-labelledby="" id="faculty" borderRadius={0} onChange={handleChange}>
              {[
                { name: 'Villamosmernoki kar', code: 'vik' },
                { name: 'Gazdasagtudomanyi kar', code: 'gtk' },
              ].map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box h={100}>
          <FormControl isInvalid={errors.major && touched.major ? true : false}>
            <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
              {t('onboarding.studies.pickers.major')}
            </FormLabel>
            <Select aria-labelledby="" id="major" borderRadius={0} onChange={handleChange}>
              {[
                { name: 'Mernokinformatikus Bsc', code: 'mi' },
                { name: 'Villamosmernok Bsc', code: 'vm' },
              ].map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </Select>
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
          next
        </Button>
      </form>
    </Flex>
  );
};
