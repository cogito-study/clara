import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate';

import { isKeyHotkey } from 'is-hotkey';

import MarkType from './MarkType';
import NodeType from './NodeType';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');

const hasMark = (type: MarkType, value: Value) => {
  return value.activeMarks.some((mark) => mark.type == type);
};

const hasBlock = (type: NodeType, value: Value) => {
  return value.blocks.some((node) => node.type == type);
};

export default function RichText() {
  return {
    renderNode: (props, _, next: Function) => {
      const { attributes, children, node } = props;

      switch (node.type) {
        case NodeType.BulletedList:
          return <ul {...attributes}>{children}</ul>;
        case NodeType.Title:
          return <h1 {...attributes}>{children}</h1>;
        case NodeType.Subtitle:
          return <h2 {...attributes}>{children}</h2>;
        case NodeType.ListItem:
          return <li {...attributes}>{children}</li>;
        case NodeType.NumberedList:
          return <ol {...attributes}>{children}</ol>;
        case NodeType.Paragraph:
          return <p style={{ margin: '10px 0px 10px 0px' }}>{children}</p>;
        default:
          return next();
      }
    },

    renderMark: (props, _, next: Function) => {
      const { children, mark, attributes } = props;

      switch (mark.type) {
        case MarkType.BOLD:
          return <strong {...attributes}>{children}</strong>;
        case MarkType.ITALIC:
          return <em {...attributes}>{children}</em>;
        case MarkType.UNDERLINED:
          return <u {...attributes}>{children}</u>;
        case MarkType.ADD_SNIPPET:
          return (
            <span style={{ borderBottom: '2px solid green' }} {...attributes}>
              {children}
            </span>
          );
        case MarkType.REMOVE_SNIPPET:
          return (
            <span style={{ borderBottom: '2px solid red' }} {...attributes}>
              {children}
            </span>
          );
        default:
          return next();
      }
    },

    onKeyDown: (event: KeyboardEvent, editor: Editor, next: Function) => {
      let mark: MarkType;
      const { key } = event;
      if (isBoldHotkey(event)) {
        mark = MarkType.BOLD;
      } else if (isItalicHotkey(event)) {
        mark = MarkType.ITALIC;
      } else if (isUnderlinedHotkey(event)) {
        mark = MarkType.UNDERLINED;
      } else if (key === 'Enter') {
        event.preventDefault();
        return editor.insertText('\n');
      } else {
        return next();
      }

      event.preventDefault();
      editor.toggleMark({ type: mark });
    },
  };
}

export { hasBlock, hasMark };
