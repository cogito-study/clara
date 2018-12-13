import React from 'react';
import NodeType from './NodeType';

const isLinkActive = (value) => {
  return value.inlines.some((inline) => inline.type == NodeType.Link);
};

const wrapLink = (editor, href: string) => {
  editor.wrapInline({
    type: NodeType.Link,
    data: { href },
  });

  editor.moveToEnd();
};

const unwrapLink = (editor) => {
  editor.unwrapInline(NodeType.Link);
};

const onClickLink = (event: React.MouseEvent<HTMLButtonElement>, editor) => {
  event.preventDefault();

  const { value } = editor;
  const hasLinks = isLinkActive(value);

  if (hasLinks) {
    editor.command(unwrapLink);
  } else if (value.selection.isExpanded) {
    const href = window.prompt('Enter the URL of the link:');

    if (href === null) {
      return;
    }

    editor.command(wrapLink, href);
  } else {
    const href = window.prompt('Enter the URL of the link:');

    if (href === null) {
      return;
    }

    const text = window.prompt('Enter the text for the link:');

    if (text === null) {
      return;
    }

    editor
      .insertText(text)
      .moveFocusBackward(text.length)
      .command(wrapLink, href);
  }
};

export default function Links() {
  return {
    renderNode: (props, _, next) => {
      const {
        attributes,
        node: { type, data },
        children,
      } = props;
      if (type === NodeType.Link) {
        const href = data.get('href');
        return (
          <a href={href} {...attributes}>
            {children}
          </a>
        );
      }
      return next();
    },
  };
}

export { isLinkActive, wrapLink, unwrapLink, onClickLink };
