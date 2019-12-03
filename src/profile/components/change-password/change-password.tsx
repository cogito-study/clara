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
import { useAuth } from '../../../auth/hooks';
import { useGraphQLErrorNotification } from '../../../core/hooks/use-graphql-error-notification';
import { useChangePasswordMutation } from './graphql/change-password-mutation.generated';

// TODO: Localize
export const ChangePassword = () => {
  const { user } = useAuth();
  const [changePassword, { loading }] = useChangePasswordMutation();
  const displayGraphQLError = useGraphQLErrorNotification();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid,
  } = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Password is required'),
      newPassword: Yup.string()
        .min(7, 'Password has to be longer than 7 characters!')
        .required('Password is required'),
      newPasswordConfirm: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Password confirm is required'),
    }),
    onSubmit: async ({ oldPassword, newPassword }, { resetForm }) => {
      if (user) {
        try {
          await changePassword({ variables: { userID: user.id, oldPassword, newPassword } });
        } catch (error) {
          displayGraphQLError(error);
        }
      }
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
        borderWidth={1}
        borderColor="grey.100"
        bg="#fff"
        p={[4, 4, 5]}
        direction="column"
        align="center"
      >
        <Box maxW={480} size="full">
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box h={100}>
              <FormControl isInvalid={errors.oldPassword && touched.oldPassword ? true : false}>
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  Current password
                </FormLabel>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="********"
                  value={values.oldPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.oldPassword}</FormErrorMessage>
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
                  placeholder="********"
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
                isInvalid={errors.newPasswordConfirm && touched.newPasswordConfirm ? true : false}
              >
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  Repeat new password
                </FormLabel>
                <Input
                  id="newPasswordConfirm"
                  type="password"
                  placeholder="********"
                  value={values.newPasswordConfirm}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.newPasswordConfirm}</FormErrorMessage>
              </FormControl>
            </Box>
            <Flex justify="flex-end">
              <Button
                isDisabled={
                  (!values.oldPassword && !values.newPassword && !values.newPasswordConfirm) ||
                  loading
                }
                variantColor="teal"
                borderRadius={0}
                variant="outline"
                color="blue.800"
                borderColor="teal.500"
                borderWidth={2}
                onClick={() => resetForm()}
              >
                cancel
              </Button>
              <Button
                ml={3}
                isDisabled={!isValid}
                isLoading={loading}
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
