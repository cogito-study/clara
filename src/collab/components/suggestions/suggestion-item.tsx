import { Button, Flex, Image, Text } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC } from 'react';

export interface SuggestionProps {
  textDelta: Delta;
  commenterName: string;
  date: string;
  onSuggestionAccepted: () => void;
  onSuggestionCancelled: () => void;
}

export const SuggestionItem: FC<SuggestionProps> = ({
  textDelta,
  commenterName,
  date,
  onSuggestionAccepted,
  onSuggestionCancelled,
}) => {
  return (
    <Flex direction="column" border="2px solid #00CCAA" p={5} width="300px" height="250px">
      <Flex>
        <Image rounded="full" size="50px" src="https://bit.ly/sage-adebayo" />
        <Flex direction="column" ml={5}>
          <Text>{commenterName}</Text>
          <Text as="cite">{date}</Text>
        </Flex>
      </Flex>
      <Text my={5} overflowY="hidden">
        {JSON.stringify(textDelta)}
      </Text>
      <Flex justifyContent="space-around">
        <Button variantColor="teal" variant="outline" onClick={() => onSuggestionCancelled()}>
          Cancel
        </Button>
        <Button variantColor="teal" onClick={() => onSuggestionAccepted()}>
          Accept
        </Button>
      </Flex>
    </Flex>
  );
};
