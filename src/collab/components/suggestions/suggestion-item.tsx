import { Button, Flex, Image, Text } from '@chakra-ui/core';
import React, { FC } from 'react';
import { SuggestionData } from './suggestion-data';

export type SuggestionFocusHoverEventProps = {
  onSuggestionHovered: (id: string) => void;
  onSuggestionBlurred: (id: string) => void;
};

export type SuggestionAcceptCancelEventProps = {
  onSuggestionAccepted: (id: string) => void;
  onSuggestionCancelled: (id: string) => void;
};

export type SuggestionEventProps = SuggestionAcceptCancelEventProps &
  SuggestionFocusHoverEventProps;

type Props = { suggestion: SuggestionData } & SuggestionEventProps;

export const SuggestionItem: FC<Props> = ({
  suggestion,
  onSuggestionAccepted,
  onSuggestionCancelled,
  onSuggestionHovered,
  onSuggestionBlurred,
}) => {
  const { id, delta, createdAt, author } = suggestion;

  return (
    <Flex
      direction="column"
      border="2px solid #00CCAA"
      p={5}
      width="300px"
      height="250px"
      onMouseEnter={() => onSuggestionHovered(id)}
      onMouseLeave={() => onSuggestionBlurred(id)}
    >
      <Flex>
        <Image
          rounded="full"
          size="50px"
          src={`https://randomuser.me/api/portraits/med/women/${Math.floor(
            Math.random() * 100,
          )}.jpg`}
        />
        <Flex direction="column" ml={5}>
          <Text>{author}</Text>
          {/* TODO: date-fns */}
          <Text as="cite">{createdAt.toDateString()}</Text>
        </Flex>
      </Flex>
      <Text my={5} overflowY="hidden">
        {JSON.stringify(delta)}
      </Text>
      <Flex justifyContent="space-around">
        <Button variantColor="teal" variant="outline" onClick={() => onSuggestionCancelled(id)}>
          {/* TODO: Localize */}
          Cancel
        </Button>
        <Button variantColor="teal" onClick={() => onSuggestionAccepted(id)}>
          {/* TODO: Localize */}
          Accept
        </Button>
      </Flex>
    </Flex>
  );
};
