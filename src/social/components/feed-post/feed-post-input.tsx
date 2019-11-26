import { Button, Flex, Input } from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { SubjectFeedDocument } from '../../../subject/components/subject-feed/graphql/subject-feed-query.generated';
import { SubjectIdentifierProps } from '../../../subject/pages/subject-page';
import { useCreatePostMutation } from './graphql/create-post-mutation.generated';

export const FeedPostInput = ({ id, subjectCode }: SubjectIdentifierProps) => {
  const [createPost, { loading }] = useCreatePostMutation();

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
          id="content"
          type="text"
          placeholder="Write your new post here..."
          borderRadius={0}
          borderWidth={1}
          borderColor="grey.100"
          bg="#fff"
          onChange={handleChange}
          value={values.content}
          onBlur={handleBlur}
        />
        <Button
          ml={1}
          px={4}
          isLoading={loading}
          type="submit"
          variantColor="teal"
          color="blue.800"
          borderRadius={0}
        >
          share
        </Button>
      </Flex>
    </form>
  );
};
