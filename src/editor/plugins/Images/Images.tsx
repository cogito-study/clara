import React from 'react';
import { Editor as CoreEditor } from 'slate';
import { Editor, Plugin, RenderNodeProps, getEventRange, getEventTransfer } from 'slate-react';
import styled from 'styled-components';

import isUrl from 'is-url';

import { NodeType } from '../../enums/NodeType';

import { extensions } from './image-extensions';

const Image = styled.img`
  display: block;
  max-height: 300px;
  max-width: auto;
`;

function isImage(url: string) {
  const [ext] = url.split('.').slice(-1);
  return !!extensions.find((e) => e === ext);
}

const insertImage = (editor: Editor, src: string, target): CoreEditor => {
  if (editor.value.selection.isBlurred) {
    return editor.blur();
  }
  return editor
    .select(target)
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
    insertImage(editor, src, editor.value.selection);
  }
};

export const uploadFileFromFS = (event, editor) => {
  event.preventDefault();
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.addEventListener('load', () => alert('Image uploaded! (almost...)'));
  reader.readAsArrayBuffer(file);
};

// tslint:disable:cyclomatic-complexity
const onDropOrPaste = (event, editor, next) => {
  const target = getEventRange(event, editor);

  if (!target && event.type === 'drop') {
    return next();
  }

  const transfer = getEventTransfer(event);
  const { type } = transfer;

  if (type === 'files') {
    const files = event.dataTransfer.files;
    for (const file of files) {
      const reader = new FileReader();
      const [mime] = file.type.split('/');
      if (mime !== 'image') {
        continue;
      }

      reader.addEventListener('load', () => {
        // TODO: send file to image storage
        editor.command(insertImage, reader.result, target);
      });

      reader.readAsDataURL(file);
    }
    return;
  }

  if (type === 'text') {
    const { text } = transfer as any;
    if (!isUrl(text) || !isImage(text)) {
      return next();
    }
    editor.command(insertImage, text, editor.value.selection);
    return;
  }

  next();
};

export const Images = (): Plugin => ({
  renderNode: (props: RenderNodeProps, editor: CoreEditor, next: () => any) => {
    const { attributes, node } = props;

    if (node.type === NodeType.Image) {
      return <Image src={node.data.get('src')} {...attributes} />;
    }

    return next();
  },
  onDrop: onDropOrPaste,
  onPaste: onDropOrPaste,
});
