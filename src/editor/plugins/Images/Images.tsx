import { Box } from 'grommet';
import isUrl from 'is-url';
import React from 'react';
import { Editor as CoreEditor } from 'slate';
import { Editor, getEventRange, getEventTransfer, Plugin, RenderNodeProps } from 'slate-react';
import styled from 'styled-components';
import { NodeType } from '../../enums/NodeType';
import { extensions } from './image-extensions';

/* eslint-disable */
// TODO: Throw out this whole shit...

const Image = styled.img`
  display: block;
  max-width: auto;
  max-height: 300px;
`;

function isImage(url: string) {
  const [ext] = url.split('.').slice(-1);
  return !!extensions.find((e) => e === ext);
}

const insertImage = (editor: Editor, src: string): CoreEditor => {
  return editor.insertBlock({
    type: NodeType.Image,
    data: { src },
  });
};

export const onClickImage = (event: React.MouseEvent<HTMLButtonElement>, editor: Editor) => {
  event.preventDefault();
  const src = window.prompt('Enter the URL of the image:');
  if (src) {
    insertImage(editor, src);
  }
};

const uploadFile = (uploadImageMutation, file: any, callback: (name: string) => void) => {
  const maximumFileSizeInMB = 10 * 1024 * 1024;
  if (file.size < maximumFileSizeInMB) {
    let reader = new FileReader();
    let extension = file.name.split('.').pop();
    reader.onloadend = async () => {
      let fileName = await uploadImageMutation({ variables: { file: reader.result, extension } });
      callback(fileName.data.uploadImage);
    };
    reader.readAsDataURL(file);
  } else {
    // TODO: add grommet notification
    alert('file size too large!');
  }
};

export const uploadFileFromFS = (uploadImageMutation, event, editor: Editor) => {
  event.preventDefault();
  const file = event.target.files[0];

  const [mime] = file.type.split('/');
  if (mime !== 'image') {
    return;
  }
  uploadFile(uploadImageMutation, file, (file) => insertImage(editor, file));
};

const handleFiles = (uploadImageMutation, files: File[], editor: Editor) => {
  for (const file of files) {
    const [mime] = file.type.split('/');
    if (mime !== 'image') {
      continue;
    }
    uploadFile(uploadImageMutation, file, (file) => insertImage(editor, file));
  }
  return;
};
const handlePastedText = (text, editor, next) => {
  if (!isUrl(text) || !isImage(text)) {
    return next();
  }
  return editor.command(insertImage, text, editor.value.selection);
};

const onPaste = (uploadImageMutation, event, editor, next) => {
  const transfer = getEventTransfer(event);
  const { type } = transfer;
  if (type === 'text') {
    const { text } = transfer as any;
    handlePastedText(text, editor, next);
  }
  if (type === 'files') {
    const files = event.clipboardData.files;
    return handleFiles(uploadImageMutation, files, editor);
  }
  return next();
};

const onDrop = (uploadImageMutation, event, editor, next) => {
  const target = getEventRange(event, editor);

  if (!target) {
    return next();
  }

  const transfer = getEventTransfer(event);
  const { type } = transfer;

  if (type === 'files') {
    const files = event.dataTransfer.files;
    return handleFiles(uploadImageMutation, files, editor);
  }

  if (type === 'text') {
    const { text } = transfer as any;
    return handlePastedText(text, editor, next);
  }
};

export const Images = (uploadImageMutation: any): Plugin => ({
  renderNode: (props: RenderNodeProps, _, next: () => any) => {
    const { attributes, node } = props;

    if (node.type === NodeType.Image) {
      return (
        <Box align="center" margin={{ vertical: 'large' }}>
          <Image
            style={{
              maxHeight: '500px',
              maxWidth: '100%',
              borderRadius: '5px',
              boxShadow: '0px 2px 4px rgba(71, 135, 211, 0.15)',
            }}
            src={node.data.get('src')}
            {...attributes}
          />{' '}
        </Box>
      );
    }

    return next();
  },
  onDrop: (event, editor, next) => onDrop(uploadImageMutation, event, editor, next),
  onPaste: (event, editor, next) => onPaste(uploadImageMutation, event, editor, next),
});
