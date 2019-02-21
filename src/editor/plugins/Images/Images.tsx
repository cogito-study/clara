import { Box } from 'grommet';
import isUrl from 'is-url';
import React from 'react';
import { Editor as CoreEditor } from 'slate';
import { Editor, getEventRange, getEventTransfer, Plugin, RenderNodeProps } from 'slate-react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
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

const uploadFile = (uploadImageMutation, editor, file) => {
  const options = {
    method: 'PUT',
    body: file,
  };
  const fileType = file.type;
  const fileName = uuid();
  // no big files
  if (file.size < 10000000) {
    uploadImageMutation({ variables: { fileName, fileType } }).then((result) => {
      const {
        data: {
          uploadImage: { url },
        },
      } = result;
      // TODO: add loading state while waiting for upload to complete
      // TODO: error
      fetch(url, options).then(() => {
        insertImage(
          editor,
          `https://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/${fileName}`,
          editor.value.selection,
        );
      });
    });
  } else {
    // TODO: add grommet notification
    alert('file size too large!');
  }
};

export const uploadFileFromFS = (uploadImageMutation, event, editor) => {
  event.preventDefault();
  const file = event.target.files[0];

  const [mime] = file.type.split('/');
  if (mime !== 'image') {
    return;
  }
  uploadFile(uploadImageMutation, editor, file);
};

const handleFiles = (uploadImageMutation, files, editor, next) => {
  for (const file of files) {
    const [mime] = file.type.split('/');
    if (mime !== 'image') {
      continue;
    }
    uploadFile(uploadImageMutation, editor, file);
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
    return handleFiles(uploadImageMutation, files, editor, next);
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
    return handleFiles(uploadImageMutation, files, editor, next);
  }

  if (type === 'text') {
    const { text } = transfer as any;
    return handlePastedText(text, editor, next);
  }
};

export const Images = (uploadImageMutation: any): Plugin => ({
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
  onDrop: (event, editor, next) => onDrop(uploadImageMutation, event, editor, next),
  onPaste: (event, editor, next) => onPaste(uploadImageMutation, event, editor, next),
});
