import { Button, Flex, Input } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export type FeedPostCommentInputProps = {};

export const FeedPostCommentInput: FC<FeedPostCommentInputProps> = () => {
  const { t } = useTranslation('social');
  return (
    <Flex py={2} px={[2, 6]} borderWidth={1} borderColor="gray.100">
      <Input
        borderWidth={1}
        borderColor="gray.100"
        placeholder={t('post.input.placeholder')}
        fontSize="sm"
        borderRadius={0}
        mr={2}
      />
      <Button
        bg="teal.500"
        borderRadius={0}
        fontSize="sm"
        px={4}
        color="blue.800"
        textTransform="lowercase"
      >
        {t('post.input.comment')}
      </Button>
    </Flex>
  );
};
