import { Button, Flex, Input } from '@chakra-ui/core';
import React, { FC, FormEvent, useState } from 'react';

export type PostInputProps = {
  onPostSend: (postContent: string) => void;
};

export const PostInput: FC<PostInputProps> = ({ onPostSend }) => {
  const [value, setValue] = useState('');
  const handleChange = (event: FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

  return (
    <Flex direction="row" minW="300px" maxW="800px">
      <Input
        placeholder="Write your new post here..."
        borderRadius="none"
        borderWidth="1px"
        borderColor="grey.100"
        color="grey.800"
        focusBorderColor="blue.200"
        bg="white"
        onChange={handleChange}
        value={value}
        _placeholder={{ color: 'grey.300' }}
      />
      <Button
        ml={1}
        px={4}
        bg="teal.500"
        color="blue.800"
        borderRadius="none"
        _hover={{ bg: 'teal.600' }}
        _active={{ bg: 'teal.600', borderWidth: '1px', borderColor: 'teal.700' }}
        onClick={() => onPostSend(value)}
      >
        share
      </Button>
    </Flex>
  );
};
