import { Box, Button, Flex, FormControl, FormLabel, Heading, Select } from '@chakra-ui/core';
import React from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  findLanguageByCode,
  sortLanguagesBySelectedFirst,
  useLanguageListQuery,
} from '../../../core/graphql/language';
import { useErrorToast } from '../../../core/hooks';
import { useChangeLanguageMutation } from './graphql/change-language-mutation.generated';

type ChangeLanguageProps = {
  userID?: string;
};

export const ChangeLanguage = ({ userID }: ChangeLanguageProps) => {
  const { i18n, t } = useTranslation(['profile', 'core']);
  const errorToast = useErrorToast();
  const { data } = useLanguageListQuery();

  const [changeLanguage, { loading: changeLanguageLoading }] = useChangeLanguageMutation();

  const { register, handleSubmit } = useForm<{ language: string }>({
    defaultValues: {
      language: i18n.language,
    },
  });

  const onSubmit = handleSubmit(async ({ language }) => {
    const selectedLanguage = findLanguageByCode({ languages: data?.languages, code: language });
    if (userID && selectedLanguage) {
      try {
        await changeLanguage({ variables: { userID, languageID: selectedLanguage.id } });
        i18n.changeLanguage(language);
      } catch (error) {
        errorToast(error);
      }
    }
  });

  const currentLanguage = findLanguageByCode({ languages: data?.languages, code: i18n.language });
  const sortedLanguages = sortLanguagesBySelectedFirst({
    languages: data?.languages,
    code: i18n.language,
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
        {t('change.preferredLanguage.title')}
      </Heading>
      <Flex
        borderWidth={1}
        borderColor="grey.100"
        bg="#fff"
        p={[4, 4, 5]}
        direction="column"
        align="center"
      >
        <Box maxW="480px" size="full">
          <form onSubmit={onSubmit}>
            <Heading as="h3" my={3} color="grey.600" fontSize="md" fontWeight="semibold">
              {t('change.preferredLanguage.current', { language: currentLanguage?.name ?? '' })}
            </Heading>
            <Box mb={4}>
              <FormControl>
                <FormLabel htmlFor="language" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  {t('change.preferredLanguage.label')}
                </FormLabel>
                <Select
                  aria-labelledby="language-picker"
                  name="language"
                  isDisabled={changeLanguageLoading}
                  ref={register}
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
            <Flex justify="flex-end">
              <Button
                isLoading={changeLanguageLoading}
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
