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
  <Box>
    <Heading
      fontSize={['md', 'lg']}
      fontWeight="bold"
      color="blue.700"
      lineHeight="normal"
      mt={[5, 6, 6, 8]}
      mb={0}
    >
      {title}
    </Heading>
    {code && department ? (
      <Flex mt={2} direction="row" justify="space-between">
        <Text fontSize="sm" color="grey.700" lineHeight="normal" maxW="70%">
          {department}
        </Text>
        <Text fontSize="sm" color="grey.700" lineHeight="normal">
          {code}
        </Text>
      </Flex>
    ) : null}
    <Box mt={3} p={[4, 6]} borderWidth="1px" borderColor="grey.100" bg="#fff">
      <Flex>
        <Text fontSize="sm" color="grey.900" lineHeight="tall">
          {description}
        </Text>
      </Flex>
    </Box>
  </Box>
);
