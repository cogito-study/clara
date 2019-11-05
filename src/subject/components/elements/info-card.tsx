import { Box, Flex, Text } from '@chakra-ui/core';
import React, { FC } from 'react';
import { InfoTitle } from './info-title';

export type InfoCardProps = {
  title: string;
  description: string;
  code?: string;
  department?: string;
};

export const InfoCard: FC<InfoCardProps> = ({ title, description, code, department }) => (
  <Box p={3} width="full">
    <InfoTitle title={title} />
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
    <Box mt={code && department ? [4, 5] : [5, 6]} p={3} borderWidth="1px" borderColor="grey.100">
      <Flex p={[4, 5, 6]}>
        <Text fontSize="sm" color="black" lineHeight="normal">
          {description}
        </Text>
      </Flex>
    </Box>
  </Box>
);
