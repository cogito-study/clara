import { Avatar, Flex, Heading, Text } from '@chakra-ui/core';
import React, { FC } from 'react';
import { useUserInfoQuery } from './graphql/user-info-query.generated';

export const PasswordUserInfo: FC<{ token: string }> = ({ token }) => {
  const { data } = useUserInfoQuery({ variables: { token } });

  return (
    <Flex direction="row" w="100%" align="center">
      <Avatar name={data && data.userInfo && data.userInfo.fullName} size="lg" />
      <Flex direction="column" justify="center" ml={4}>
        <Heading as="h3" fontSize="md" color="blue.800">
          {data && data.userInfo && data.userInfo.fullName}
        </Heading>
        <Text color="grey.800" mt={2}>
          {data && data.userInfo && data.userInfo.email}
        </Text>
      </Flex>
    </Flex>
  );
};
