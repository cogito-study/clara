import React from 'react';
import { Editor as CoreEditor, Range, RangeProperties } from 'slate';
import { Editor, Plugin, RenderNodeProps } from 'slate-react';
import styled from 'styled-components';
import { NodeType } from '../enums/NodeType';

const Image = styled.img`
  display: block;
  max-height: 300px;
  max-width: auto;
`;

const insertImage = (editor: CoreEditor, src: string, target: Range | RangeProperties): CoreEditor =>
  editor
    .insertBlock({
      type: NodeType.Image,
      data: { src },
    })
    .select(target);

export const onClickImage = (event: React.MouseEvent<HTMLButtonElement>, editor: Editor) => {
  event.preventDefault();
  const src = window.prompt('Enter the URL of the image:');

  if (src) {
    editor.command(src, insertImage);
  }
};

export const Images = (): Plugin => ({
  renderNode: (props: RenderNodeProps, editor: CoreEditor, next: () => any) => {
    const { attributes, node } = props;

    if (node.type === NodeType.Image) {
      return <Image src={node.data.get('src')} {...attributes} />;
    }

    return next();
  },
});
