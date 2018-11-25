import React from 'react';
import { isKeyHotkey } from 'is-hotkey';

import MarkType from './MarkType';

const addCommentShortCut = isKeyHotkey('mod+k');

const addComment = (editor, id) => {
  editor.addMark({ type: MarkType.COMMENT, data: { id } });
};

export default function Comments(createCommentCallback: () => number) {
  return {
    renderMark: (props, _, next: Function) => {
      const {
        attributes,
        children,
        mark: { type },
      } = props;
      alert(`type: ${type}`);
      if (type === MarkType.COMMENT) {
        return (
          <span style={{ backgroundColor: '#4787D3' }} {...attributes}>
            {children}
          </span>
        );
      }
      return next();
    },
    onKeyDown: (event: KeyboardEvent, editor, next) => {
      if (addCommentShortCut(event)) {
        event.preventDefault();
        const id = createCommentCallback();
        return editor.command(addComment, id);
      }
      return next();
    },
  };
}

export { addComment };
