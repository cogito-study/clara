import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Spinner,
} from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Head } from '../../../core/components';
import { TokenType } from '../../../core/graphql/types.generated';
import {
  mergeValidationSchemas,
  useErrorToast,
  useFormValidationSchema,
  useRouteQueryParams,
} from '../../../core/hooks';
import { useTokenValidation } from '../../hooks';
import { authRoute } from '../../utils/auth-route';
import { Feedback } from '../feedback/feedback';
import { PasswordUserInfo } from '../password-user-info/password-user-info';
import { useActivateInvitationMutation } from './graphql/activate-invitation-mutation.generated';

export const ActivateInvitation = () => {
  const history = useHistory();
  const { t } = useTranslation(['auth', 'core']);
  const { token } = useRouteQueryParams<{ token?: string }>();
  const errorToast = useErrorToast();

  const { passwordConfirmSchema, legalCheckboxSchema } = useFormValidationSchema();
  const validationSchema = mergeValidationSchemas([passwordConfirmSchema, legalCheckboxSchema]);

  const { isTokenValidationLoading } = useTokenValidation({ token, type: TokenType.Activation });
  const [activateInvitation, { data, loading }] = useActivateInvitationMutation();

  const { register, handleSubmit, errors } = useForm({ validationSchema });

  const onSubmit = handleSubmit(async ({ password }) => {
    if (token) {
      try {
        await activateInvitation({ variables: { password, token } });
      } catch (error) {
        errorToast(error);
      }
    }
  });

  return (
    <>
      <Head title={t('activation.title')} />
      {isTokenValidationLoading ? (
        <Flex align="center" justify="center">
          <Spinner size="xl" color="blue.800" thickness="3px" />
        </Flex>
      ) : data?.activateInvitation ? (
        <Feedback
          title={t('activation.feedback.title')}
          icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
          description={t('activation.feedback.description')}
          buttonLabel={t('button.login')}
          onButtonClick={() => history.push(authRoute({ path: 'login' }))}
        />
      ) : (
        <Flex
          h={530}
          py={8}
          px={[4, 8, 12]}
          bg="#fff"
          borderWidth={1}
          justify="space-between"
          align="center"
          direction="column"
        >
          <Heading as="h2" fontSize="lg" color="blue.800" textAlign="center">
            {t('activation.title')}
          </Heading>

          <PasswordUserInfo token={token} />

          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Box h={100}>
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

            <Box h="52px">
              <FormControl isRequired isInvalid={errors.legal && true}>
                <Checkbox name="legal" size="sm" variantColor="teal" ref={register}>
                  <Trans
                    i18nKey="core:form.terms.label"
                    components={[
                      <Link
                        color="teal.700"
                        href="https://cogito.study/privacy-policy"
                        key="privacy policy"
                        isExternal={true}
                      />,
                      <Link
                        color="teal.700"
                        href="https://cogito.study/terms-conditions"
                        key="terms and conditions"
                        isExternal={true}
                      />,
                    ]}
                  />
                </Checkbox>
                <FormErrorMessage fontSize={14}>{errors.legal?.message}</FormErrorMessage>
              </FormControl>
            </Box>

            <Button
              isLoading={loading}
              mt={6}
              variantColor="teal"
              width="100%"
              borderRadius={0}
              type="submit"
              variant="solid"
              color="blue.800"
            >
              {t('button.activate')}
            </Button>
          </form>
        </Flex>
      )}
    </>
  );
};
