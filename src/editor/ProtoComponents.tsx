import React from 'react';
import ReactDOM from 'react-dom';

export const HoverContainer = ({ top, left, children, shown, innerRef }) => {
  const root = window.document.getElementById('root');
  return ReactDOM.createPortal(
    <div ref={innerRef} style={{ position: 'absolute', zIndex: 1, left, top }}>
      {shown && children}
    </div>,
    root!,
  );
};

export const CommentBoxContainer = ({ top, children }) => (
  <p style={{ marginTop: top }}>{top > 0 ? children : undefined}</p>
);
