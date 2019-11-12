import { Flex } from '@chakra-ui/core';
import React from 'react';

// TODO: Styling
export const EditorToolbar = () => (
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
);
