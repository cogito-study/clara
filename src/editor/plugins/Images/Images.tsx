import React from 'react';
import { Editor as CoreEditor } from 'slate';
import { Editor, Plugin, RenderNodeProps /* getEventRange, getEventTransfer */ } from 'slate-react';
import styled from 'styled-components';

// import isUrl from 'is-url';

import { NodeType } from '../../enums/NodeType';

// import * as extensions from './image-extensions.json';

const Image = styled.img`
  display: block;
  max-height: 300px;
  max-width: auto;
`;

// function isImage(url: string) {
//   return !!extensions.find(url.endsWith);
// }

const insertImage = (editor: Editor, src: string): CoreEditor => {
  if (editor.value.selection.isBlurred) {
    return editor.blur();
  }
  return editor
    .insertBlock({
      type: NodeType.Image,
      data: { src },
    })
    .blur();
};

export const onClickImage = (event: React.MouseEvent<HTMLButtonElement>, editor: Editor) => {
  event.preventDefault();
  const src = window.prompt('Enter the URL of the image:');
  if (src) {
    insertImage(editor, src);
  }
};

export const uploadFileFromFS = (event, editor) => {
  event.preventDefault();
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.addEventListener('load', () => alert('Image uploaded! (almost...)'));
  reader.readAsArrayBuffer(file);
  editor.focus();
  insertImage(
    editor,
    'https://preview.redd.it/saukp810w5c21.png?width=768&auto=webp&s=682385c5b7a8e43a8dc21a377e7b7495e449d9fd',
  );
};

// // tslint:disable:cyclomatic-complexity
// const onDropOrPaste = (event, editor, next) => {
//   const target = getEventRange(event, editor);

//   if (!target && event.type === 'drop') {
//     return next();
//   }

//   const transfer = getEventTransfer(event);
//   const { type, text, files } = transfer;

//   if (type === 'files') {
//     for (const file of files) {
//       const reader = new FileReader();
//       const [mime] = file.type.split('/');
//       if (mime !== 'image') {
//         continue;
//       }

//       reader.addEventListener('load', () => {
//         editor.command(insertImage, reader.result, target);
//       });

//       reader.readAsDataURL(file);
//     }
//     return;
//   }

//   if (type === 'text') {
//     if (!isUrl(text) || !isImage(text)) {
//       return next();
//     }
//     editor.command(insertImage, text, target);
//     return;
//   }

//   next();
// };

export const Images = (): Plugin => ({
  renderNode: (props: RenderNodeProps, editor: CoreEditor, next: () => any) => {
    const { attributes, node } = props;

    if (node.type === NodeType.Image) {
      return <Image src={node.data.get('src')} {...attributes} />;
    }

    return next();
  },
});
