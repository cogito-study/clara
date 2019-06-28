import { Editor } from 'slate-react';
import { MarkType } from '../enums/mark-type';
import { NodeType } from '../enums/node-type';

/* eslint-disable */

export const onClickMark = (editor: Editor, type: MarkType) => {
  editor.toggleMark(type);
};

export const onClickBlock = (editor: Editor, type: NodeType) => {
  if (editor.value.blocks.some((block) => block!.type === type)) {
    editor.setBlocks(NodeType.Paragraph);
  } else {
    editor.setBlocks(type);
  }
};
