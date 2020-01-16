import { Button, Flex, Heading, Image } from '@chakra-ui/core';
import React from 'react';

interface EmptyStateProps {
  onAdd?: () => void;
  title: string;
  icon: string;
  buttonTitle?: string;
}

export const EmptyState = ({ onAdd, title, icon, buttonTitle }: EmptyStateProps) => (
  <Flex direction="column" align="center" py={[8, 16]} color="grey.700">
    <Heading textAlign="center" lineHeight="normal" fontSize={['md', 'lg']}>
      {title}
    </Heading>
    <Image mt={[6, 12]} src={icon} width={['90%', 'initial']} />
    {onAdd && (
      <Button onClick={onAdd} color="blue.800" mt={8} variantColor="teal" borderRadius={0}>
        {buttonTitle}
      </Button>
    )}
  </Flex>
);
