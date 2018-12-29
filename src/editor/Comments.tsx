import React from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';

import MarkType from './MarkType';

const CommentContainer = styled.span`
  background-color: #4787d3;
  color: white;
`;

interface CommentProps {
  onClickCallback: (top: number) => void;
  canShowComments: () => boolean;
}

class Comment extends React.Component<CommentProps, {}> {
  getPosition = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
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

export default function Comments(onClickCallback: (id: number, top: number) => void, canShowComments: boolean) {
  return {
    renderMark: (props, _, next: VoidFunction) => {
      const {
        attributes,
        children,
        mark: { type, data },
      } = props;
      if (type === MarkType.COMMENT) {
        return canShowComments ? (
          <Comment onClickCallback={(top) => onClickCallback(data.get('id'), top)} {...attributes}>
            {children}
          </Comment>
        ) : (
          undefined
        );
      }
      return next();
    },
  };
}
