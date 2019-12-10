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
  Spinner,
} from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { TokenType } from '../../../core/graphql/types.generated';
import {
  useDocumentTitle,
  useFormValidationSchema,
  useRouteQueryParams,
} from '../../../core/hooks';
import { useTokenValidation } from '../../hooks';
import { authRoute } from '../../utils/auth-route';
import { Feedback } from '../feedback/feedback';
import { PasswordUserInfo } from '../password-user-info/password-user-info';
import { useResetPasswordMutation } from './graphql/reset-password-mutation.generated';

type ResetPasswordForm = {
  password: string;
  passwordConfirm: string;
};

export const ResetPassword = () => {
  const { t } = useTranslation(['auth', 'core']);
  const history = useHistory();
  const { token } = useRouteQueryParams<{ token: string }>();
  const { passwordConfirmSchema } = useFormValidationSchema();

  useDocumentTitle(t('resetPassword.title'));

  const { isTokenValidationLoading } = useTokenValidation({ token, type: TokenType.ResetPassword });
  const [resetPassword, { data, loading }] = useResetPasswordMutation();

  const { register, handleSubmit, errors, reset } = useForm<ResetPasswordForm>({
    validationSchema: passwordConfirmSchema,
  });

  const onSubmit = handleSubmit(({ password }) => {
    resetPassword({ variables: { password, token } });
    reset();
  });

  console.log(token);

  return isTokenValidationLoading ? (
    <Flex align="center" justify="center">
      <Spinner size="xl" color="blue.800" thickness="3px" />
    </Flex>
  ) : data?.resetPassword ? (
    <Feedback
      title={t('resetPassword.feedback.title')}
      icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
      description={t('resetPassword.feedback.description')}
      buttonLabel={t('button.login')}
      onButtonClick={() => history.push(authRoute({ path: 'login' }))}
    />
  ) : (
    <Flex
      h={460}
      py={8}
      px={[4, 8, 12]}
      bg="#fff"
      borderWidth={1}
      justify="space-between"
      align="center"
      direction="column"
    >
      <Heading as="h2" fontSize="lg" color="blue.800">
        {t('resetPassword.title')}
      </Heading>

      <PasswordUserInfo token={token} />

      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <Box h={108}>
          <FormControl isRequired isInvalid={errors.password && true}>
            <FormLabel htmlFor="password" color="blue.800">
              {t('core:form.password.label')}
            </FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="*******"
              ref={register}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box h={100}>
          <FormControl isRequired isInvalid={errors.passwordConfirm && true}>
            <FormLabel htmlFor="passwordConfirm" color="blue.800">
              {t('core:form.password.confirm.label')}
            </FormLabel>
            <Input
              name="passwordConfirm"
              type="password"
              placeholder="*******"
              ref={register}
              borderRadius={0}
            />
            <FormErrorMessage fontSize={14}>{errors.passwordConfirm?.message}</FormErrorMessage>
          </FormControl>
        </Box>

        <Button
          mt={6}
          isLoading={loading}
          variantColor="teal"
          width="100%"
          borderRadius={0}
          type="submit"
          variant="solid"
          color="blue.800"
        >
          {t('button.reset')}
        </Button>
      </form>
    </Flex>
  );
};
