import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const PrototypeButton = styled.button`
  border: 2px solid black;
  color: black;
  font-weight: bold;
  background-color: white;
`;

const Flex = styled.div`
  display: flex;
`;

const HoverContainer = ({ top, left, children, shown, innerRef }) => {
  const root = window.document.getElementById('root');
  return ReactDOM.createPortal(
    <div ref={innerRef} style={{ position: 'absolute', zIndex: 1, left, top }}>
      {shown && children}
    </div>,
    root!,
  );
};

export { PrototypeButton, Flex, HoverContainer };
