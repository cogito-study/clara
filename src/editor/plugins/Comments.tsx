import React, { FunctionComponent } from 'react';
import { RenderMarkProps, findDOMNode, Plugin } from 'slate-react';
import { Editor as CoreEditor, Node } from 'slate';
import styled from 'styled-components';

import { MarkType } from '../enums/MarkType';

const CommentContainer = styled.span`
  background-color: ${(props) => props.theme.global.colors.primary};
  color: white;
`;

interface CommentProps {
  node: Node;
  onClickCallback: (top: number) => void;
}

const Comment: FunctionComponent<CommentProps> = ({ children, onClickCallback, node }) => {
  const getPosition = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const commentNode = findDOMNode(node);
    if (commentNode instanceof HTMLElement) {
      onClickCallback(commentNode.offsetTop);
    }
  };

  return <CommentContainer onClick={getPosition}>{children}</CommentContainer>;
};

export const Comments = (onClickCallback: (id: number, top: number) => void): Plugin => ({
  renderMark: (props: RenderMarkProps, editor: CoreEditor, next: () => any) => {
    const {
      children,
      node,
      mark: { type, data },
    } = props;

    if (type === MarkType.Comment) {
      return (
        <Comment node={node} onClickCallback={(top) => onClickCallback(data.get('id'), top)}>
          {children}
        </Comment>
      );
    }
    return next();
  },
});
