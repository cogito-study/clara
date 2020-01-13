import { Button, Flex, Input } from '@chakra-ui/core';
import React, { useEffect, useRef } from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useErrorToast } from '../../../core/hooks';
import { SubjectFeedDocument } from '../../../subject/components/subject-feed/graphql/subject-feed-query.generated';
import { SubjectIdentifierProps } from '../../../subject/pages/subject-page';
import { useCreatePostMutation } from './graphql/create-post-mutation.generated';

type Props = { shouldFocus: boolean } & SubjectIdentifierProps;

export const FeedPostInput = ({ id, subjectCode, shouldFocus }: Props) => {
  const { t } = useTranslation('social');
  const errorToast = useErrorToast();
  const inputRef = useRef<HTMLFormElement | null>(null);
  const [createPost, { loading }] = useCreatePostMutation();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const onSubmit = handleSubmit(async ({ content }) => {
    try {
      await createPost({
        variables: { content, subjectID: id },
        refetchQueries: [{ query: SubjectFeedDocument, variables: { subjectCode } }],
      });
    } catch (error) {
      errorToast(error);
    } finally {
      reset();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="row">
        <Input
          ref={(instance) => {
            register(instance, { required: true });
            inputRef.current = instance;
          }}
          name="content"
          type="text"
          fontSize="medium"
          placeholder={t('post.input.placeholder')}
          borderRadius={0}
          borderWidth={1}
          borderColor="grey.100"
          bg="#fff"
        />
        <Button
          type="submit"
          ml={2}
          minW={120}
          isLoading={loading}
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
