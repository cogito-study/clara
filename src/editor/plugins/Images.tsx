import React from 'react';
import { Editor as CoreEditor } from 'slate';
import { Image, Box } from 'grommet';
import { Editor, Plugin, RenderNodeProps } from 'slate-react';
//import styled from 'styled-components';
import { NodeType } from '../enums/NodeType';

/*
const Immage = styled.img`
  display: block;
  max-height: 300px;
  max-width: auto;
`;
*/

const insertImage = (editor: Editor, src: string): CoreEditor =>
  editor
    .insertBlock({
      type: NodeType.Image,
      data: { src },
    })
    .blur();

export const onClickImage = (event: React.MouseEvent<HTMLButtonElement>, editor: Editor) => {
  event.preventDefault();
  const src = window.prompt('Enter the URL of the image:');
  if (src) {
    insertImage(editor, src);
  }
};

export const Images = (): Plugin => ({
  renderNode: (props: RenderNodeProps, editor: CoreEditor, next: () => any) => {
    const { attributes, node } = props;

    if (node.type === NodeType.Image) {
      return (
        <Box align="center" margin={{ vertical: 'large' }}>
          <Image
            style={{ maxHeight: '500px', boxShadow: '0px 2px 4px rgba(71, 135, 211, 0.15)' }}
            src={node.data.get('src')}
            {...attributes}
          />{' '}
        </Box>
      );
    }

    return next();
  },
});
