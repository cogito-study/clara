import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';
import { MarkType } from './enums/MarkType';
import { NodeType } from './enums/NodeType';
import { onClickImage } from './plugins/Images';
import { onClickLink } from './plugins/Links';
import { onClickBlock, onClickMark } from './plugins/utils';
import { Button, Box } from 'grommet';

export const HoverContainer = ({ top, left, children, shown, innerRef }) => {
  const root = window.document.getElementById('root');
  return ReactDOM.createPortal(
    <div ref={innerRef} style={{ position: 'absolute', zIndex: 1, left, top }}>
      {shown && children}
    </div>,
    root!,
  );
};

const prevented = (event: React.MouseEvent, callback: () => void) => {
  event.preventDefault();
  callback();
};

export const renderEditorToolBox = (editor: Editor) => (
  <Box gap="xsmall" pad={{ top: 'large' }}>
    <Button
      label="Szöveg"
      color="gray_dark_2"
      onMouseDown={(e) => prevented(e, () => onClickBlock(editor, NodeType.Paragraph))}
      margin={{ bottom: 'small' }}
      style={{ fontSize: '16px', fontFamily: 'Merriweather' }}
    />
    <Button
      label="Cím"
      color="gray_dark_3"
      onMouseDown={(e) => prevented(e, () => onClickBlock(editor, NodeType.Title))}
      style={{ fontSize: '32px', lineHeight: '1.1em', fontFamily: 'Merriweather' }}
    />
    <Button
      label="Alcím"
      color="gray_dark_2"
      onMouseDown={(e) => prevented(e, () => onClickBlock(editor, NodeType.Subtitle))}
      margin={{ bottom: 'medium' }}
      style={{ fontSize: '26px', lineHeight: '1.1em', fontFamily: 'Merriweather' }}
    />
    <Button
      label="Kiemelt"
      color="gray"
      onMouseDown={(e) => prevented(e, () => onClickMark(editor, MarkType.Bold))}
      style={{ color: 'black', fontFamily: 'Merriweather' }}
    />
    <Button
      label="Dőlt"
      color="gray_dark_1"
      onMouseDown={(e) => prevented(e, () => onClickMark(editor, MarkType.Italic))}
      margin={{ bottom: 'medium' }}
      style={{ fontStyle: 'Italic', fontFamily: 'Merriweather' }}
    />
    <Button label="Kép (image)" color="gray" onMouseDown={(e) => onClickImage(e, editor)} />
    <Button label="Kép (link)" color="gray" onMouseDown={(e) => onClickLink(e, editor)} />
  </Box>
);
