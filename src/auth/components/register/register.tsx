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
  PseudoBox,
  Select,
} from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { FiSend } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Head } from '../../../core/components';
import {
  findLanguageByCode,
  sortLanguagesBySelectedFirst,
  useLanguageListQuery,
} from '../../../core/graphql/language';
import {
  mergeValidationSchemas,
  useErrorToast,
  useFormValidationSchema,
} from '../../../core/hooks';
import { authRoute } from '../../utils/auth-route';
import { Feedback } from '../feedback/feedback';
import { useRegisterUserMutation } from './graphql/register-user-mutation.generated';

type RegisterForm = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  language: string;
  legal: boolean;
};

export const Register = () => {
  const { t, i18n } = useTranslation(['auth', 'core']);
  const errorToast = useErrorToast();

  const { passwordConfirmSchema, emailSchema, legalCheckboxSchema } = useFormValidationSchema();
  const schema = mergeValidationSchemas([emailSchema, passwordConfirmSchema, legalCheckboxSchema]);

  const { data: languageListData } = useLanguageListQuery();
  const [
    registerUser,
    { data: registerUserData, loading: registerUserLoading },
  ] = useRegisterUserMutation();

  const { register, handleSubmit, errors } = useForm<RegisterForm>({
    defaultValues: { language: i18n.language },
    mode: 'onBlur',
    validationSchema: schema.shape({
      firstName: Yup.string().required(t('core:form.firstName.validation.required')),
      lastName: Yup.string().required(t('core:form.lastName.validation.required')),
    }),
  });

  const onSubmit = handleSubmit(async ({ language, email, firstName, lastName, password }) => {
    const selectedLanguage = findLanguageByCode({
      languages: languageListData?.languages,
      code: language,
    });

    if (selectedLanguage) {
      try {
        await registerUser({
          variables: {
            data: {
              email,
              firstName,
              lastName,
              password,
              preferredLanguage: { id: selectedLanguage.id },
            },
          },
        });
        i18n.changeLanguage(language);
      } catch (error) {
        errorToast(error);
      }
    }
  });

  const sortedLanguages = sortLanguagesBySelectedFirst({
    languages: languageListData?.languages,
    code: i18n.language,
  });

  return (
    <>
      <Head title={t('register.title')} />
      {registerUserData?.register ? (
        <Feedback
          title={t('register.feedback.title')}
          icon={<Icon as={FiSend} color="blue.600" size="96px" />}
          description={t('register.feedback.description')}
        />
      ) : (
        <Flex height="100%" align="start">
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
              {t('register.title')}
            </Heading>

            <form onSubmit={onSubmit} style={{ width: '100%' }}>
              <Box h={100}>
                <FormControl isRequired isInvalid={errors.firstName && true}>
                  <FormLabel htmlFor="firstName" color="blue.800">
                    {t('core:form.firstName.label')}
                  </FormLabel>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder={t('core:form.firstName.placeholder')}
                    ref={register}
                    borderRadius={0}
                  />
                  <FormErrorMessage fontSize={14}>{errors.firstName?.message}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box h={100}>
                <FormControl isRequired isInvalid={errors.lastName && true}>
                  <FormLabel htmlFor="lastName" color="blue.800">
                    {t('core:form.lastName.label')}
                  </FormLabel>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder={t('core:form.lastName.placeholder')}
                    ref={register}
                    borderRadius={0}
                  />
                  <FormErrorMessage fontSize={14}>{errors.lastName?.message}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box h={100}>
                <FormControl isRequired isInvalid={errors.email && true}>
                  <FormLabel htmlFor="email" color="blue.800">
                    {t('core:form.email.label')}
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
                  <FormErrorMessage fontSize={14}>
                    {errors.passwordConfirm?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box h={100}>
                <FormControl>
                  <FormLabel htmlFor="language" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                    {t('core:form.preferredLanguage.label')}
                  </FormLabel>
                  <Select
                    aria-labelledby="language-picker"
                    name="language"
                    ref={register}
                    borderRadius={0}
                    css={{ select: { borderRadius: 0 } }}
                  >
                    {sortedLanguages?.map(({ code, name }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box h={80}>
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
                type="submit"
                isLoading={registerUserLoading}
                mt={6}
                variantColor="teal"
                width="100%"
                borderRadius={0}
                variant="solid"
                color="blue.800"
              >
                {t('button.register')}
              </Button>
            </form>

            <RouterLink to={authRoute({ path: 'login' })}>
              <PseudoBox
                mt={2}
                py={2}
                px={3}
                textAlign="center"
                fontFamily="heading"
                fontWeight="semibold"
                color="teal.700"
                borderRadius={0}
                textTransform="lowercase"
                _hover={{ bg: 'teal.50' }}
              >
                {t('button.signIn')}
              </PseudoBox>
            </RouterLink>
          </Flex>
        </Flex>
      )}
    </>
  );
};
