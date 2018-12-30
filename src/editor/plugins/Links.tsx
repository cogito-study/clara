import React from 'react';
import { Plugin, RenderNodeProps } from 'slate-react';
import { Editor as CoreEditor, Value } from 'slate';

import { NodeType } from '../enums/NodeType';

export const isLinkActive = (value: Value) => {
  return value.inlines.some((inline) => (inline ? inline.type === NodeType.Link : false));
};

export const onClickLink = (event: React.MouseEvent<HTMLButtonElement>, editor: CoreEditor) => {
  event.preventDefault();

  const { value } = editor;

  if (isLinkActive(value)) {
    editor.unwrapInline(NodeType.Link);
  } else if (value.selection.isExpanded) {
    const href = window.prompt('Enter the URL of the link:');

    if (href) {
      editor
        .wrapInline({
          type: NodeType.Link,
          data: { href },
        })
        .moveToEnd();
    }
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
