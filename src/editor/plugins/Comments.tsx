import React, { FunctionComponent } from 'react';
import { Node, Range } from 'slate';
import { Editor, Plugin, RenderMarkProps } from 'slate-react';
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

export const toggleCommentMark = (editor: Editor, range: Range, id: string, show: boolean) => {
  editor
    .select(range)
    .replaceMark({ type: MarkType.Comment, data: { id, show: !show } }, { type: MarkType.Comment, data: { id, show } });
};

const Comment: FunctionComponent<CommentProps> = ({ children, onClickCallback }) => {
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    onClickCallback(e.clientY + window.scrollY);
  };
  return <CommentContainer onMouseDown={onMouseDown}>{children}</CommentContainer>;
};

export const Comments = (onClickCallback: (id: number, top: number) => void): Plugin => ({
  renderMark: (props: RenderMarkProps, _, next: () => any) => {
    const {
      children,
      node,
      attributes,
      mark: { type, data },
    } = props;

    if (type === MarkType.Comment) {
      const id = data.get('id');
      const show = data.get('show');
      if (show) {
        return (
          <Comment key={id} node={node} onClickCallback={(top) => onClickCallback(id, top)} {...attributes}>
            {children}
          </Comment>
        );
      } else {
        return <span {...attributes}>{children}</span>;
      }
    }
    return next();
  },
});
