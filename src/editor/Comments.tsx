import React from 'react';
import { findDOMNode } from 'react-dom';

import { isKeyHotkey } from 'is-hotkey';
import styled from 'styled-components';

import MarkType from './MarkType';

const addCommentShortCut = isKeyHotkey('mod+k');

const CommentContainer = styled.span`
  background-color: #4787d3;
  color: white;
`;

interface CommentProps {
  onClickCallback: (top: number) => void;
}

class Comment extends React.Component<CommentProps, {}> {
  getPosition = (event: React.MouseEvent<HTMLSpanElement>) => {
    const { onClickCallback } = this.props;
    const node = findDOMNode(this);
    const top = (node! as HTMLElement).offsetTop;
    onClickCallback(top);
  };

  render() {
    const { children } = this.props;
    return <CommentContainer onClick={(e) => this.getPosition(e)}>{children}</CommentContainer>;
  }
}

export default function Comments(createComment: () => void, onClickCallback: (top: number, id: number) => void) {
  return {
    renderMark: (props, _, next: VoidFunction) => {
      const {
        attributes,
        children,
        mark: { type, data },
      } = props;
      if (type === MarkType.COMMENT) {
        return (
          <Comment onClickCallback={(top) => onClickCallback(top, data.get('id'))} {...attributes}>
            {children}
          </Comment>
        );
      }
      return next();
    },
    onKeyDown: (event: KeyboardEvent, _, next) => {
      if (addCommentShortCut(event)) {
        createComment();
        return true;
      }
      return next();
    },
  };
}
