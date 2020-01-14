import { Button, Flex, IconButton, Textarea } from '@chakra-ui/core';
import React, { useEffect, useRef } from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiSend } from 'react-icons/fi';
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
      <Flex direction="row" align="center">
        <Textarea
          ref={(instance) => {
            register(instance, { required: true });
            inputRef.current = instance;
          }}
          name="content"
          type="text"
          fontSize="sm"
          resize="vertical"
          minH={10}
          placeholder={t('post.input.placeholder')}
          borderRadius={0}
          borderWidth={1}
          bg="#fff"
        />
        <IconButton
          d={['inherit', 'none']}
          aria-label={t('post.share')}
          icon={FiSend}
          type="submit"
          ml={2}
          isLoading={loading}
          variantColor="teal"
          color="blue.800"
          borderRadius={0}
        />

        <Button
          d={['none', 'inherit']}
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
