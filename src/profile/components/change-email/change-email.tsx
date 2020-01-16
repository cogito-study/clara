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
import { useErrorToast, useFormValidationSchema } from '../../../core/hooks';
import { useChangeEmailMutation } from './graphql/change-email-mutation.generated';

type ChangeEmailProps = {
  userID?: string;
  email?: string;
};

export const ChangeEmail = ({ userID, email }: ChangeEmailProps) => {
  const { t } = useTranslation(['profile', 'core']);
  const errorToast = useErrorToast();
  const { emailSchema } = useFormValidationSchema();
  const [changeEmail, { loading }] = useChangeEmailMutation();

  const { register, errors, handleSubmit, reset, formState } = useForm<{ email: string }>({
    mode: 'onChange',
    validationSchema: emailSchema,
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    if (userID) {
      try {
        await changeEmail({ variables: { email, userID } });
      } catch (error) {
        errorToast(error);
      } finally {
        reset();
      }
    }
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
        {t('change.email.title')}
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
          <Flex align="center" mb={4} wrap="wrap">
            <Heading fontSize={['sm', 'sm', 'md']} fontWeight={500} pr={1} lineHeight="normal">
              {t('change.email.current')}
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
          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Box mb={4}>
              <FormControl isInvalid={errors.email && true}>
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  {t('change.email.new')}
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder={t('core:form.email.placeholder')}
                  ref={register}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.email?.message}</FormErrorMessage>
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
                isLoading={loading}
                isDisabled={!formState.isValid}
                variantColor="teal"
                borderRadius={0}
                type="submit"
                variant="solid"
                color="blue.800"
              >
                {t('change.email.update')}
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
