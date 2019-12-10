/** @jsx jsx */
import { Button, Flex, FormControl, FormLabel, Heading, Select, Spinner } from '@chakra-ui/core';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useInstitutesByTokenQuery } from './graphql/institutes-by-token-query.generated';

type PickStudiesForm = {
  university: string;
  faculty: string;
  major: string;
};

export type PickStudiesProps = {
  token: string;
  onFormSubmit: (majorID: string) => void;
};

export const PickStudies = ({ token, onFormSubmit }: PickStudiesProps) => {
  const { t } = useTranslation('auth');
  const { data, loading } = useInstitutesByTokenQuery({ variables: { token } });

  const { register, handleSubmit, watch, formState } = useForm<PickStudiesForm>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(({ major }) => {
    onFormSubmit(major);
  });

  const faculties = data?.institutesByToken
    ?.filter((institute) => institute.id === watch('university'))
    ?.flatMap((institute) => institute.faculties);

  const majors = faculties
    ?.filter((faculty) => faculty.id === watch('faculty'))
    ?.flatMap((faculty) => faculty.majors);

  return (
    <Flex
      py={8}
      px={[4, 8, 12]}
      bg="#fff"
      borderWidth={1}
      justify="space-between"
      align="center"
      direction="column"
    >
      <Heading as="h2" fontSize="lg" color="blue.800" mb={5} textAlign="center" lineHeight="normal">
        {t('onboarding.studies.title')}
      </Heading>

      {loading ? (
        <Spinner size="xl" m={10} thickness="3px" />
      ) : (
        <form onSubmit={onSubmit} css={{ width: '100%' }}>
          <FormControl mt={4}>
            <FormLabel htmlFor="university" color="blue.800" fontSize={['sm', 'sm', 'md']}>
              {t('onboarding.studies.pickers.university')}
            </FormLabel>
            <StyledSelect
              aria-labelledby="university-picker"
              name="university"
              ref={register({ required: true })}
            >
              {data?.institutesByToken?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="faculty" color="blue.800" fontSize={['sm', 'sm', 'md']}>
              {t('onboarding.studies.pickers.faculty')}
            </FormLabel>
            <StyledSelect
              aria-labelledby="faculty-picker"
              name="faculty"
              ref={register({ required: true })}
              isDisabled={faculties?.length === 0}
            >
              {faculties?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="major" color="blue.800" fontSize={['sm', 'sm', 'md']}>
              {t('onboarding.studies.pickers.major')}
            </FormLabel>
            <StyledSelect
              aria-labelledby="major-picker"
              name="major"
              ref={register({ required: true })}
              isDisabled={majors?.length === 0}
            >
              {majors?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          </FormControl>

          <Button
            type="submit"
            mt={8}
            isDisabled={!formState.isValid}
            variantColor="teal"
            width="100%"
            borderRadius={0}
            variant="solid"
            color="blue.800"
          >
            next
          </Button>
        </form>
      )}
    </Flex>
  );
};

const StyledSelect = styled(Select)`
  border-radius: 0;

  select {
    border-radius: 0;
  }
`;
