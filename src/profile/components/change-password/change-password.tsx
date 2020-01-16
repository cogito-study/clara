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
import React from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useErrorToast, useFormValidationSchema } from '../../../core/hooks';
import { useChangePasswordMutation } from './graphql/change-password-mutation.generated';

type ChangePasswordForm = {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};

type ChangePasswordProps = {
  userID?: string;
};

export const ChangePassword = ({ userID }: ChangePasswordProps) => {
  const { t } = useTranslation(['profile', 'core']);
  const { passwordConfirmSchema } = useFormValidationSchema();
  const errorToast = useErrorToast();

  const [changePassword, { loading }] = useChangePasswordMutation();

  const { register, handleSubmit, errors, reset, formState } = useForm<ChangePasswordForm>({
    mode: 'onBlur',
    validationSchema: passwordConfirmSchema.shape({
      oldPassword: Yup.string().required(t('core:form.password.validation.required')),
    }),
  });

  const onSubmit = handleSubmit(async ({ oldPassword, password }) => {
    console.log({ old: oldPassword, new: password });
    if (userID) {
      try {
        await changePassword({ variables: { userID, oldPassword, newPassword: password } });
      } catch (error) {
        errorToast(error);
      }
    }
    reset();
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
        {t('change.password.title')}
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
          <form onSubmit={onSubmit}>
            <Box mb={4}>
              <FormControl isInvalid={errors.oldPassword && true}>
                <FormLabel htmlFor="oldPassword" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  {t('change.password.current')}
                </FormLabel>
                <Input
                  name="oldPassword"
                  type="password"
                  placeholder="********"
                  ref={register}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.oldPassword?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box mb={4}>
              <FormControl isInvalid={errors.password && true}>
                <FormLabel htmlFor="password" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  {t('change.password.new')}
                </FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="********"
                  ref={register}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box mb={4}>
              <FormControl isInvalid={errors.passwordConfirm && true}>
                <FormLabel htmlFor="passwordConfirm" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  {t('change.password.confirm')}
                </FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  placeholder="********"
                  ref={register}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.passwordConfirm?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Flex justify="flex-end">
              <Button
                isDisabled={loading}
                variantColor="teal"
                borderRadius={0}
                variant="outline"
                color="blue.800"
                borderColor="teal.500"
                borderWidth={2}
                onClick={() => reset()}
              >
                {t('core:button.cancel')}
              </Button>
              <Button
                ml={3}
                isDisabled={!formState.isValid}
                isLoading={loading}
                variantColor="teal"
                borderRadius={0}
                type="submit"
                variant="solid"
                color="blue.800"
              >
                {t('core:button.save')}
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
