import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Editor as CoreEditor } from 'slate';
import { Editor, Plugin, RenderNodeProps, getEventRange, getEventTransfer } from 'slate-react';
import { Box } from 'grommet';
import styled from 'styled-components';

import { UploadImageMutation, UploadImageMutationVariables } from './__generated__/UploadImageMutation';
import { UPLOAD_IMAGE_MUTATION } from './UploadImageMutation';

import isUrl from 'is-url';

import { NodeType } from '../../enums/NodeType';

import { extensions } from './image-extensions';

const Image = styled.img`
  display: block;
  max-height: 300px;
  max-width: auto;
`;

const uploadImage = useMutation<UploadImageMutation, UploadImageMutationVariables>(UPLOAD_IMAGE_MUTATION, {});

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

const uploadFile = (editor, file) => {
  const options = {
    method: 'PUT',
    body: file,
  };

  const [fileName, fileType] = file.type.split('/');

  if (file.size < 10000000) {
    uploadImage({ variables: { fileName, fileType } }).then(({ data, url }) => {
      fetch(url, options).then(() => insertImage(editor, url, editor.value.selection));
    });
  } else {
    // TODO: add grommet notification
    alert('file size too large!');
  }
};

export const uploadFileFromFS = (event, editor) => {
  event.preventDefault();
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.addEventListener('load', () => uploadFile(editor, reader.result));
  reader.readAsArrayBuffer(file);
};

const handleFiles = (files, editor, next) => {
  for (const file of files) {
    const reader = new FileReader();
    const [mime] = file.type.split('/');
    if (mime !== 'image') {
      continue;
    }

    reader.addEventListener('load', () => {
      uploadFile(editor, file);
    });

    reader.readAsDataURL(file);
  }
  return;
};
const handlePastedText = (text, editor, next) => {
  if (!isUrl(text) || !isImage(text)) {
    return next();
  }
  return editor.command(insertImage, text, editor.value.selection);
};

const onPaste = (event, editor, next) => {
  const transfer = getEventTransfer(event);
  const { type } = transfer;
  if (type === 'text') {
    const { text } = transfer as any;
    handlePastedText(text, editor, next);
  }
  if (type === 'files') {
    const files = event.clipboardData.files;
    return handleFiles(files, editor, next);
  }
  return next();
};

const onDrop = (event, editor, next) => {
  const target = getEventRange(event, editor);

  if (!target) {
    return next();
  }

  const transfer = getEventTransfer(event);
  const { type } = transfer;

  if (type === 'files') {
    const files = event.dataTransfer.files;
    return handleFiles(files, editor, next);
  }

  if (type === 'text') {
    const { text } = transfer as any;
    return handlePastedText(text, editor, next);
  }
};

export const Images = (): Plugin => ({
  renderNode: (props: RenderNodeProps, editor: CoreEditor, next: () => any) => {
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
  onDrop,
  onPaste,
});
