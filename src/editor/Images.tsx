import React from 'react';
import styled from 'styled-components';

import NodeType from './NodeType';

const Image = styled.img`
  display: block;
  max-height: 300px;
  max-width: auto;
`;

const insertImage = (editor, src, target) => {
  if (target) {
    editor.select(target);
  }
  editor.insertBlock({
    type: NodeType.Image,
    data: { src },
  });
};

const onClickImage = (event: React.MouseEvent<HTMLButtonElement>, editor) => {
  event.preventDefault();
  const src = window.prompt('Enter the URL of the image:');
  if (!src) return;
  editor.command(insertImage, src);
  return true;
};

export default function Images() {
  return {
    renderNode: (props, _, next) => {
      const { attributes, node } = props;
      if (node.type === NodeType.Image) {
        return <Image src={node.data.get('src')} {...attributes} />;
      }
      return next();
    },
  };
}

export { onClickImage };
