import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import React, { FC } from 'react';

export type SubjectInfoCardProps = {
  title: string;
  description: string;
  code?: string;
  department?: string;
};

export const SubjectInfoCard: FC<SubjectInfoCardProps> = ({
  title,
  description,
  code,
  department,
}) => (
  <Box width="full">
    <Heading
      fontSize={['md', 'lg']}
      fontWeight="bold"
      maxWidth="80%"
      color="blue.700"
      lineHeight="normal"
    >
      {title}
    </Heading>
    {code && department ? (
      <Flex mt={5} direction="row" justify="space-between">
        <Text mt={1} fontSize="sm" color="grey.500" lineHeight="normal" maxW="70%">
          {department}
        </Text>
        <Text mt={1} fontSize="sm" color="grey.500" lineHeight="normal">
          {code}
        </Text>
      </Flex>
    ) : null}
    <Box
      mt={code && department ? [4, 5] : [5, 6]}
      p={3}
      borderWidth="1px"
      borderColor="grey.100"
      bg="#fff"
    >
      <Flex p={[4, 5, 6]}>
        <Text fontSize="sm" color="black" lineHeight="normal">
          {description}
        </Text>
      </Flex>
    </Box>
  </Box>
);
