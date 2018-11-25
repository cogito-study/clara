import React from 'react';
import { isKeyHotkey } from 'is-hotkey';

import MarkType from './MarkType';

const addCommentShortCut = isKeyHotkey('mod+k');

const addComment = (editor, id) => {
  editor.addMark({ type: MarkType.COMMENT, data: { id } });
};

export default function Comments(createComment: () => void) {
  return {
    renderMark: (props, _, next: Function) => {
      const {
        attributes,
        children,
        mark: { type },
      } = props;
      if (type === MarkType.COMMENT) {
        return (
          <span style={{ backgroundColor: '#4787D3', color: 'white' }} {...attributes}>
            {children}
          </span>
        );
      }
      return next();
    },
    onKeyDown: (event: KeyboardEvent, editor, next) => {
      if (addCommentShortCut(event)) {
        createComment();
        return true;
      }
      return next();
    },
  };
}

export { addComment };
