/** @jsx jsx */
import { Button, Checkbox, Flex, Heading, Spinner, Text } from '@chakra-ui/core';
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useErrorToast } from '../../../core/hooks';
import { useMajorByTokenQuery } from './graphql/major-by-token.generated';

export type PickSubjectsProps = {
  token: string;
  majorID: string;
  isSubmitting: boolean;
  onSave: (subjectIDs: string[]) => void;
  onBack: () => void;
};

export const PickSubjects = ({
  token,
  majorID,
  isSubmitting,
  onSave,
  onBack,
}: PickSubjectsProps) => {
  const { t } = useTranslation(['auth', 'core']);
  const errorToast = useErrorToast();

  const { data, loading } = useMajorByTokenQuery({ variables: { token, majorID } });
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((formData) => {
    const selectedSubjectIDs = Object.entries(formData)
      .filter(([, value]) => value)
      .map(([key]) => key);

    selectedSubjectIDs.length
      ? onSave(selectedSubjectIDs)
      : errorToast(new Error(t('onboarding.subjects.error')));
  });

  return (
    <Flex
      py={8}
      px={[4, 8, 12]}
      bg="#fff"
      borderWidth={1}
      justify="space-between"
      align="center"
      width="100%"
      direction="column"
    >
      <Heading as="h2" fontSize="lg" color="blue.800" mb={5} textAlign="center">
        {t('onboarding.subjects.title')}
      </Heading>
      {loading ? (
        <Spinner size="xl" m={10} />
      ) : (
        <Fragment>
          <form onSubmit={onSubmit} css={{ width: '100%' }}>
            <Flex direction="column">
              {data?.majorByToken?.subjects.map(({ id, name, department }) => (
                <Checkbox
                  key={id}
                  name={id}
                  ref={register}
                  size="md"
                  variantColor="teal"
                  mt={3}
                  color="grey.800"
                >
                  <Text px={1}>{name}</Text>
                  <Text
                    px={1}
                    textTransform="uppercase"
                    fontSize={11}
                    fontWeight="bold"
                    color="blue.800"
                  >
                    {department?.name}
                  </Text>
                </Checkbox>
              ))}
            </Flex>

            <Button
              mt={8}
              isLoading={isSubmitting}
              variantColor="teal"
              width="100%"
              borderRadius={0}
              type="submit"
              variant="solid"
              color="blue.800"
            >
              {t('core:button.save')}
            </Button>
          </form>

          <Button
            mt={3}
            isDisabled={isSubmitting}
            variant="ghost"
            variantColor="teal"
            borderRadius={0}
            color="teal.700"
            onClick={onBack}
          >
            {t('core:button.back')}
          </Button>
        </Fragment>
      )}
    </Flex>
  );
};
