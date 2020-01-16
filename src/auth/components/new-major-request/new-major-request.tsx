import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';
import { Head } from '../../../core/components';
import { TokenType } from '../../../core/graphql/types.generated';
import { useErrorToast, useRouteQueryParams } from '../../../core/hooks';
import { useTokenValidation } from '../../hooks';
import { Feedback } from '../feedback/feedback';
import { useCreateNewMajorRequestMutation } from './graphql/create-new-major-request.generated';

type NewMajorRequestForm = {
  institute: string;
  faculty: string;
  major: string;
};

export const NewMajorRequest = () => {
  const { t } = useTranslation('auth');
  const { token } = useRouteQueryParams<{ token?: string }>();
  const errorToast = useErrorToast();

  const { isTokenValidationLoading } = useTokenValidation({ token, type: TokenType.Activation });
  const [createNewMajorRequest, { loading, data }] = useCreateNewMajorRequestMutation();
  const { register, handleSubmit, reset } = useForm<NewMajorRequestForm>();

  const onSubmit = handleSubmit(async ({ institute, faculty, major }) => {
    if (token) {
      try {
        await createNewMajorRequest({ variables: { institute, faculty, major, token } });
      } catch (error) {
        errorToast(error);
      } finally {
        reset();
      }
    }
  });

  return (
    <>
      <Head title={t('newMajorRequest.title')} />
      {isTokenValidationLoading ? (
        <Flex align="center" justify="center">
          <Spinner size="xl" color="blue.800" thickness="3px" />
        </Flex>
      ) : data?.createNewMajorRequest ? (
        <Feedback
          title={t('newMajorRequest.feedback.title')}
          icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
          description={t('newMajorRequest.feedback.description')}
        />
      ) : (
        <Flex
          py={8}
          px={[4, 8]}
          bg="#fff"
          borderWidth={1}
          justify="space-between"
          align="stretch"
          direction="column"
        >
          <Heading as="h2" fontSize="lg" color="blue.800" textAlign="center" lineHeight="normal">
            {t('newMajorRequest.title')}
          </Heading>

          <Text color="blue.800" mb={4} textAlign="center" lineHeight="tall">
            {t('newMajorRequest.subtitle')}
          </Text>

          <form onSubmit={onSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="institute" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                {t('newMajorRequest.institute.label')}
              </FormLabel>
              <Input
                name="institute"
                type="text"
                placeholder={t('newMajorRequest.institute.placeholder')}
                ref={register({ required: true })}
                borderRadius={0}
              />
            </FormControl>

            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="faculty" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                {t('newMajorRequest.faculty.label')}
              </FormLabel>
              <Input
                name="faculty"
                type="text"
                placeholder={t('newMajorRequest.faculty.placeholder')}
                ref={register({ required: true })}
                borderRadius={0}
              />
            </FormControl>

            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="major" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                {t('newMajorRequest.major.label')}
              </FormLabel>
              <Input
                name="major"
                type="text"
                placeholder={t('newMajorRequest.major.placeholder')}
                ref={register({ required: true })}
                borderRadius={0}
              />
            </FormControl>

            <Button
              type="submit"
              mt={4}
              isLoading={loading}
              variantColor="teal"
              w="full"
              borderRadius={0}
              variant="solid"
              color="blue.800"
            >
              {t('button.submit')}
            </Button>
          </form>
        </Flex>
      )}
    </>
  );
};
