import { Button, Flex, Icon, Image, Text } from '@chakra-ui/core';
import React, { FC } from 'react';

export interface EditorHeaderProps {
  profileName: string;
}

export const EditorHeader: FC<EditorHeaderProps> = ({ profileName }) => {
  return (
    <Flex
      flexGrow={1}
      top={0}
      width="100%"
      height="60px"
      position="fixed"
      zIndex={2}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="blue.700"
    >
      <Flex alignItems="center">
        <Text as="strong" fontSize="2xl" color="white" ml={5}>
          COGITO
        </Text>
        <Icon name="edit" color="white" size="20px" ml={3} />
      </Flex>
      <Flex alignItems="center">
        <div id="toolbar" style={{ border: 'none' }}>
          <span className="ql-formats">
            <select className="ql-size"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-image"></button>
          </span>
        </div>
      </Flex>
      <Flex alignItems="center">
        <Button onClick={() => {}} mr={5}>
          Mentés
        </Button>
        <Image rounded="full" size="40px" src="https://bit.ly/sage-adebayo" mr={3} />
        <Text as="span" fontSize="lg" color="white" mr={10}>
          {profileName}
        </Text>
        <Icon name="arrow-back" color="white" size="20px" mr={5}></Icon>
      </Flex>
    </Flex>
  );
};
