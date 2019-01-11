import React, { FunctionComponent } from 'react';
import { Node } from 'slate';
import { Plugin, RenderMarkProps } from 'slate-react';
import styled from 'styled-components';

import { MarkType } from '../enums/MarkType';

const CommentContainer = styled.span`
  background-color: rgba(71, 135, 211, 0.7);
  color: white;
  padding: 2px 0px 2px 0px;
  border: 1px solid rgba(71, 135, 211, 1);
`;

interface CommentProps {
  node: Node;
  onClickCallback: (top: number) => void;
}

const Comment: FunctionComponent<CommentProps> = ({ children, onClickCallback, node }) => {
  const calculateSelectionPosition = () =>
    window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect().top;
  return <CommentContainer onClick={() => onClickCallback(calculateSelectionPosition())}>{children}</CommentContainer>;
};

export const Comments = (onClickCallback: (id: number, top: number) => void): Plugin => ({
  renderMark: (props: RenderMarkProps, _, next: () => any) => {
    const {
      children,
      node,
      mark: { type, data },
    } = props;

    if (type === MarkType.Comment) {
      const id = data.get('id');
      return (
        <Comment key={id} node={node} onClickCallback={(top) => onClickCallback(id, top)}>
          {children}
        </Comment>
      );
    }
    return next();
  },
});
