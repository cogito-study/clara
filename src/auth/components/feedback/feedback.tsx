import { Button, Flex, Heading, Text } from '@chakra-ui/core';
import React, { FC, ReactNode } from 'react';

export interface FeedbackProps {
  title: string;
  icon: ReactNode;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export const Feedback: FC<FeedbackProps> = ({
  title,
  icon,
  description,
  buttonLabel,
  onButtonClick,
}) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    py={8}
    px={12}
    bg="#fff"
    borderColor="grey.200"
    borderWidth={1}
  >
    <Heading as="h2" fontSize="lg" color="blue.800" mb={8}>
      {title}
    </Heading>
    {icon}
    <Text color="grey.600" textAlign="center" mt={8}>
      {description}
    </Text>
    {onButtonClick && (
      <Button
        variantColor="teal"
        color="blue.800"
        width="100%"
        borderRadius={0}
        mt={6}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    )}
  </Flex>
);
