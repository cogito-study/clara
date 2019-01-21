import { isKeyHotkey } from 'is-hotkey';
import React from 'react';
import { Heading, Paragraph } from 'grommet';
import { Editor as CoreEditor, Value } from 'slate';
import { Plugin, RenderMarkProps, RenderNodeProps } from 'slate-react';

import { MarkType } from '../enums/MarkType';
import { NodeType } from '../enums/NodeType';
//import { colors } from '../../ui/theme/global';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');

const findMarkForEvent = (event: Event): MarkType | undefined => {
  switch (event) {
    case isBoldHotkey:
      return MarkType.Bold;

    case isItalicHotkey:
      return MarkType.Italic;

    case isUnderlinedHotkey:
      return MarkType.Underlined;

    default:
      return undefined;
  }
};

export const hasMark = (type: MarkType, value: Value) =>
  value.activeMarks.some((mark) => (mark ? mark.type === type : false));

export const hasBlock = (type: NodeType, value: Value) =>
  value.blocks.some((node) => (node ? node.type === type : false));

// tslint:disable:cyclomatic-complexity
export const RichText = (): Plugin => ({
  renderNode: (props: RenderNodeProps, _, next: () => any) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case NodeType.BulletedList:
        return <ul {...attributes}>{children}</ul>;
      case NodeType.Title:
        return (
          <Heading
            level="2"
            color="gray_dark_3"
            margin={{ top: 'medium', bottom: 'small', horizontal: 'none' }}
            style={{ fontFamily: 'Merriweather' }}
            {...attributes}
          >
            {children}
          </Heading>
        );
      case NodeType.Subtitle:
        return (
          <Heading
            level="3"
            color="gray_dark_2"
            margin={{ top: 'large', bottom: 'small', horizontal: 'none' }}
            style={{ fontFamily: 'Merriweather' }}
            {...attributes}
          >
            {children}
          </Heading>
        );
      case NodeType.ListItem:
        return <li {...attributes}>{children}</li>;
      case NodeType.NumberedList:
        return <ol {...attributes}>{children}</ol>;
      case NodeType.Paragraph:
        return (
          <Paragraph margin="none" style={{ fontFamily: 'Merriweather' }} {...attributes}>
            {children}
          </Paragraph>
        );
      default:
        return next();
    }
  },

  renderMark: (props: RenderMarkProps, _, next: () => any) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case MarkType.Bold:
        return <strong {...attributes}>{children}</strong>;
      case MarkType.Italic:
        return <em {...attributes}>{children}</em>;
      case MarkType.Underlined:
        return <u {...attributes}>{children}</u>;
      case MarkType.AddSnippet:
        return (
          <span style={{ borderBottom: '2px solid green' }} {...attributes}>
            {children}
          </span>
        );
      case MarkType.RemoveSnippet:
        return (
          <span style={{ borderBottom: '2px solid red' }} {...attributes}>
            {children}
          </span>
        );
      default:
        return next();
    }
  },

  onKeyDown: (event: Event, editor: CoreEditor, next: VoidFunction) => {
    const mark = findMarkForEvent(event);
    if (mark !== undefined) {
      event.preventDefault();
      editor.toggleMark({ type: mark });
    }
    next();
  },
});
