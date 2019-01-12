import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';
import { MarkType } from './enums/MarkType';
import { NodeType } from './enums/NodeType';
import { onClickImage } from './plugins/Images';
import { onClickLink } from './plugins/Links';
import { onClickBlock, onClickMark } from './plugins/utils';

export const HoverContainer = ({ top, left, children, shown, innerRef }) => {
  const root = window.document.getElementById('root');
  return ReactDOM.createPortal(
    <div ref={innerRef} style={{ position: 'absolute', zIndex: 1, left, top }}>
      {shown && children}
    </div>,
    root!,
  );
};

const prevented = (event: React.MouseEvent, callback: () => void) => {
  event.preventDefault();
  callback();
};

export const renderEditorToolBox = (editor: Editor) => (
  <div>
    <button onMouseDown={(e) => prevented(e, () => onClickBlock(editor, NodeType.Title))}>Title</button>
    <button onMouseDown={(e) => prevented(e, () => onClickBlock(editor, NodeType.Subtitle))}>Subtitle</button>
    <br />
    <button onMouseDown={(e) => prevented(e, () => onClickMark(editor, MarkType.Bold))}>Bold</button>
    <button onMouseDown={(e) => prevented(e, () => onClickMark(editor, MarkType.Italic))}>Italic</button>
    <button onMouseDown={(e) => prevented(e, () => onClickMark(editor, MarkType.Underlined))}>Underlined</button>
    <br />
    <button onMouseDown={(e) => onClickImage(e, editor)}>Image</button>
    <br />
    <button onMouseDown={(e) => onClickLink(e, editor)}>Image</button>
  </div>
);
