import { Box, Button, Flex, FormControl, FormLabel, Heading, Select } from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../auth/hooks';
import { useGraphQLErrorNotification } from '../../../core/hooks/use-graphql-error-notification';
import { useChangeLanguageMutation } from './graphql/change-language-mutation.generated';
import { LanguageFragment } from './graphql/language-fragment.generated';
import { useLanguageListQuery } from './graphql/language-list-query.generated';

const findLanguageByCode = ({
  languages,
  code,
}: {
  languages?: Readonly<LanguageFragment[]>;
  code?: string;
}) => {
  if (code && languages) {
    return languages.find((language) => language.code === code);
  }

  return undefined;
};

export const ChangeLanguage = () => {
  const { i18n, t } = useTranslation(['profile', 'core']);
  const { user } = useAuth();
  const displayGraphQLError = useGraphQLErrorNotification();
  const { data } = useLanguageListQuery();

  const [changeLanguage, { loading: changeLanguageLoading }] = useChangeLanguageMutation();

  const { errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      language: 'en',
    },
    onSubmit: async ({ language }) => {
      const selectedLanguage = findLanguageByCode({ languages: data?.languages, code: language });
      if (user && selectedLanguage) {
        try {
          await changeLanguage({ variables: { userID: user.id, languageID: selectedLanguage.id } });
          i18n.changeLanguage(language);
        } catch (error) {
          displayGraphQLError(error);
        }
      }
    },
  });

  const currentLanguage = findLanguageByCode({ languages: data?.languages, code: i18n.language });
  const sortedLanguages =
    data && [...data.languages].sort(({ code }) => (code === currentLanguage?.code ? -1 : 1));

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
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Heading as="h3" my={3} color="grey.600" fontSize="md" fontWeight="semibold">
              {t('change.preferredLanguage.current', { language: currentLanguage?.name ?? '' })}
            </Heading>
            <Box h={100}>
              <FormControl isInvalid={errors.language && touched.language ? true : false}>
                <FormLabel htmlFor="email" color="blue.800" fontSize={['sm', 'sm', 'md']}>
                  {t('change.preferredLanguage.label')}
                </FormLabel>
                <Select
                  aria-labelledby="language-picker"
                  id="language"
                  isDisabled={changeLanguageLoading}
                  style={{ borderRadius: 0 }}
                  onChange={handleChange}
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
