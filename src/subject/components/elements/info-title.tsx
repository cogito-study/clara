import { Heading } from '@chakra-ui/core';
import React, { FC } from 'react';

export type InfoTitleProps = {
  title: string;
};

export const InfoTitle: FC<InfoTitleProps> = ({ title }) => (
  <Heading
    mb={6}
    fontSize={['md', 'lg']}
    fontWeight={600}
    maxWidth="80%"
    color="blue.700"
    lineHeight="normal"
  >
    {title}
  </Heading>
);
