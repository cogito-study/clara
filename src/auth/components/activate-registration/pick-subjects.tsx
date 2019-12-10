/** @jsx jsx */
import { Button, Checkbox, Flex, Heading, Spinner } from '@chakra-ui/core';
import { jsx } from '@emotion/core';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMajorByTokenQuery } from './graphql/major-by-token.generated';

export type PickSubjectsProps = {
  token: string;
  majorID: string;
  isSubmitting: boolean;
  onSave: (subjectIDs: string[]) => void;
};

export const PickSubjects = ({ token, majorID, isSubmitting, onSave }: PickSubjectsProps) => {
  const { t } = useTranslation(['auth', 'core']);

  const { data, loading } = useMajorByTokenQuery({ variables: { token, majorID } });
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((formData) => {
    const selectedSubjectIDs = Object.entries(formData)
      .filter(([, value]) => value)
      .map(([key]) => key);
    onSave(selectedSubjectIDs);
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
      <Heading as="h2" fontSize="lg" color="blue.800" mb={5}>
        {t('onboarding.subjects.title')}
      </Heading>
      {loading ? (
        <Spinner size="xl" m={10} />
      ) : (
        <form onSubmit={onSubmit} css={{ width: '100%' }}>
          <Flex direction="column">
            {data?.majorByToken?.subjects.map(({ id, name }) => (
              <Checkbox
                key={id}
                name={id}
                ref={register}
                size="md"
                variantColor="teal"
                mt={3}
                color="grey.800"
              >
                {name}
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
      )}
    </Flex>
  );
};
