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
  PseudoBox,
  Text,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Head } from '../../../core/components';
import { useErrorToast, useFormValidationSchema } from '../../../core/hooks';
import { authRoute } from '../../utils/auth-route';
import { Feedback } from '../feedback/feedback';
import { useForgotPasswordMutation } from './graphql/forgot-password-mutation.generated';

export const ForgotPassword = () => {
  const [hasSubmitted, setSubmitted] = useState(false);
  const { t } = useTranslation(['auth', 'core']);
  const { emailSchema } = useFormValidationSchema();
  const errorToast = useErrorToast();

  const [forgotPassword] = useForgotPasswordMutation();

  const { register, handleSubmit, errors } = useForm({ validationSchema: emailSchema });

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      await forgotPassword({ variables: { email } });
      setSubmitted(true);
    } catch (error) {
      errorToast(error);
    }
  });

  return (
    <>
      <Head title={t('forgotPassword.title')} />
      {hasSubmitted ? (
        <Feedback
          title={t('forgotPassword.feedback.title')}
          icon={<Icon as={FiSend} color="blue.600" size="96px" />}
          description={t('forgotPassword.feedback.description')}
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
          <Heading fontSize="lg" color="blue.800" textAlign="center">
            {t('forgotPassword.title')}
          </Heading>
          <Text textAlign="center" color="grey.800">
            {t('forgotPassword.description')}
          </Text>

          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Box mb={4}>
              <FormControl isInvalid={errors.email && true}>
                <FormLabel htmlFor="email" color="blue.800">
                  {t('core:form.email.label')}
                </FormLabel>
                <Input
                  name="email"
                  type="text"
                  placeholder={t('core:form.email.placeholder')}
                  ref={register}
                  borderRadius={0}
                />
                <FormErrorMessage fontSize={14}>{errors.email?.message}</FormErrorMessage>
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
              {t('button.sendMail')}
            </Button>
          </form>

          <Link to={authRoute({ path: 'login' })}>
            <PseudoBox
              p={2}
              mt={2}
              textAlign="center"
              fontFamily="heading"
              fontWeight="semibold"
              color="teal.700"
              borderRadius={0}
              textTransform="lowercase"
              _hover={{ bg: 'teal.50' }}
            >
              {t('button.login')}
            </PseudoBox>
          </Link>
        </Flex>
      )}
    </>
  );
};
