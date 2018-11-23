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

export { isLinkActive, wrapLink, unwrapLink };
