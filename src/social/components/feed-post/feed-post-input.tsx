import { Button, Flex, Input } from '@chakra-ui/core';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SubjectFeedDocument } from '../../../subject/components/subject-feed/graphql/subject-feed-query.generated';
import { SubjectIdentifierProps } from '../../../subject/pages/subject-page';
import { useCreatePostMutation } from './graphql/create-post-mutation.generated';

type Props = { shouldFocus: boolean } & SubjectIdentifierProps;

export const FeedPostInput = ({ id, subjectCode, shouldFocus }: Props) => {
  const { t } = useTranslation('social');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [createPost, { loading }] = useCreatePostMutation();

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { content: '' },
    onSubmit: async ({ content }, { resetForm }) => {
      resetForm();
      createPost({
        variables: { content, subjectID: id },
        refetchQueries: [{ query: SubjectFeedDocument, variables: { subjectCode } }],
      });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="row" minW="300px" maxW="800px">
        <Input
          ref={inputRef}
          id="content"
          type="text"
          fontSize="medium"
          placeholder={t('post.input.placeholder')}
          borderRadius={0}
          borderWidth={1}
          borderColor="grey.100"
          bg="#fff"
          onChange={handleChange}
          value={values.content}
          onBlur={handleBlur}
        />
        <Button
          ml={2}
          px={4}
          isLoading={loading}
          type="submit"
          variantColor="teal"
          color="blue.800"
          borderRadius={0}
        >
          {t('post.share')}
        </Button>
      </Flex>
    </form>
  );
};
