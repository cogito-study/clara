import React from 'react';
import ReactDOM from 'react-dom';

const HoverContainer = ({ top, left, children, shown, innerRef }) => {
  const root = window.document.getElementById('root');
  return ReactDOM.createPortal(
    <div ref={innerRef} style={{ position: 'absolute', zIndex: 1, left, top }}>
      {shown && children}
    </div>,
    root!,
  );
};

export { HoverContainer };
