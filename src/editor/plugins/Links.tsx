import React from 'react';
import { Editor as CoreEditor, Value } from 'slate';
import { Editor, Plugin, RenderNodeProps } from 'slate-react';
import { NodeType } from '../enums/NodeType';

export const wrapLink = (editor, href) => {
  editor.wrapInline({
    type: NodeType.Link,
    data: { href },
  });

  editor.moveToEnd();
};

export const unwrapLink = (editor) => {
  editor.unwrapInline(NodeType.Link);
};

export const isLinkActive = (value: Value) => {
  return value.inlines.some((inline) => (inline ? inline.type === NodeType.Link : false));
};

export const onClickLink = (event: React.MouseEvent<HTMLButtonElement>, editor: Editor) => {
  event.preventDefault();

  const { value } = editor;

  if (isLinkActive(value)) {
    editor.unwrapInline(NodeType.Link);
  } else if (value.selection.isExpanded) {
    const href = window.prompt('Enter the URL of the link:');

    wrapLink(editor, href);
  } else {
    const href = window.prompt('Enter the URL of the link:');
    const text = window.prompt('Enter the text for the link:');

    if (href || text === null) {
      return;
    }

    editor
      .insertText(text)
      .moveFocusBackward(text.length)
      .wrapInline({
        type: NodeType.Link,
        data: { href },
      })
      .moveToEnd();
  }
};

export const Links = (): Plugin => ({
  renderNode: (props: RenderNodeProps, editor: CoreEditor, next: () => any) => {
    const {
      attributes,
      node: { type, data },
      children,
    } = props;

    if (type === NodeType.Link) {
      return (
        <a href={data.get('href')} {...attributes}>
          {children}
        </a>
      );
    }

    return next();
  },
});
