import React from 'react';

import { Editor } from 'slate-react';
import { Value } from 'slate';

import CollapseOnEscape from 'slate-collapse-on-escape';
import PasteLinkify from 'slate-paste-linkify';

import { isKeyHotkey } from 'is-hotkey';
import styled from 'styled-components';

import testValue from './testValue.json';
import NodeType from './NodeType';
import MarkType from './MarkType';

const Image = styled.img`
  display: block;
  max-height: 300px;
  max-width: auto;
`;

const PrototypeButton = styled.button`
  border: 2px solid black;
  color: black;
  font-weight: bold;
  background-color: white;
`;

const Flex = styled.div`
  display: flex;
`;

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const undoHotkey = isKeyHotkey('mod+z');
const redoHotkey = isKeyHotkey('mod+shift+z');

interface EditorState {
  value: Value;
}

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }
  editor.insertBlock({
    type: NodeType.Image,
    data: { src },
  });
}

const schema = {
  blocks: {
    image: {
      isVoid: true,
    },
  },
};

export default class CogitoEditor extends React.Component {
  editor!: Editor;

  ref = (editor) => {
    this.editor = editor;
  };

  state: EditorState = {
    value: Value.fromJSON(testValue),
  };

  renderNode = (props, _, next: Function) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case NodeType.BulletedList:
        return <ul {...attributes}>{children}</ul>;
      case NodeType.Title:
        return <h1 {...attributes}>{children}</h1>;
      case NodeType.Subtitle:
        return <h2 {...attributes}>{children}</h2>;
      case NodeType.ListItem:
        return <li {...attributes}>{children}</li>;
      case NodeType.NumberedList:
        return <ol {...attributes}>{children}</ol>;
      case NodeType.Image:
        return <Image src={node.data.get('src')} {...attributes} />;
      case NodeType.Link: {
        const { data } = node;
        const href = data.get('href');
        return (
          <a
            onClick={(e: KeyboardEvent) => {
              if (e.metaKey) {
                e.stopPropagation();
                window.open(href, '_blank');
              }
            }}
            href={href}
            {...attributes}
          >
            {children}
          </a>
        );
      }
      default:
        return next();
    }
  };

  renderMark = (props, _, next: Function) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case MarkType.BOLD:
        return <strong {...attributes}>{children}</strong>;
      case MarkType.ITALIC:
        return <em {...attributes}>{children}</em>;
      case MarkType.UNDERLINED:
        return <u {...attributes}>{children}</u>;
      case 'add-snippet':
        return (
          <span style={{ borderBottom: '2px solid green' }} {...attributes}>
            {children}
          </span>
        );
      case 'remove-snippet':
        return (
          <span style={{ borderBottom: '2px solid red' }} {...attributes}>
            {children}
          </span>
        );
      default:
        return next();
    }
  };

  renderMarkButton = (type: MarkType) => {
    return <PrototypeButton onMouseDown={(e) => this.onClickMark(e, type)}>{type}</PrototypeButton>;
  };

  renderBlockButton = (type: NodeType) => {
    return <PrototypeButton onMouseDown={(e) => this.onClickBlock(e, type)}>{type}</PrototypeButton>;
  };

  onKeyDown = (event: KeyboardEvent, editor: Editor, next: Function) => {
    let mark: MarkType;

    if (isBoldHotkey(event)) {
      mark = MarkType.BOLD;
    } else if (isItalicHotkey(event)) {
      mark = MarkType.ITALIC;
    } else if (isUnderlinedHotkey(event)) {
      mark = MarkType.UNDERLINED;
    } else if (undoHotkey(event)) {
      event.preventDefault();
      this.undo();
      return true;
    } else if (redoHotkey(event)) {
      event.preventDefault();
      this.redo();
      return true;
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  undo = () => {
    this.editor.undo();
  };

  redo = () => {
    this.editor.redo();
  };

  hasMark = (type: MarkType) => {
    const { value } = this.state;
    return value.activeMarks.some((mark) => mark.type == type);
  };

  hasBlock = (type: NodeType) => {
    const { value } = this.state;
    return value.blocks.some((node) => node.type == type);
  };

  isLinkActive = () => {
    const { value } = this.state;
    return value.inlines.some((inline) => inline.type == 'link');
  };

  wrapLink = (_, href: string) => {
    const { editor } = this;
    editor.wrapInline({
      type: NodeType.Link,
      data: { href },
    });

    editor.moveToEnd();
  };

  unwrapLink = () => {
    this.editor.unwrapInline('link');
  };

  onClickMark = (event: React.MouseEvent<HTMLButtonElement>, type: MarkType) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onClickBlock = (event: React.MouseEvent<HTMLButtonElement>, type: NodeType) => {
    event.preventDefault();
    event.stopPropagation();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    const DEFAULT_NODE = NodeType.Paragraph;

    // Handle everything but list buttons.
    if (type != NodeType.BulletedList && type != NodeType.NumberedList) {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock(NodeType.ListItem);

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock(NodeType.BulletedList)
          .unwrapBlock(NodeType.NumberedList);
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock(NodeType.ListItem);
      // Same type as one given in argument
      const sameType = value.blocks.some((block) => {
        return !!document.getClosest(block.key, (parent) => parent.type == type);
      });

      if (isList && sameType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock(NodeType.BulletedList)
          .unwrapBlock(NodeType.NumberedList);
      } else if (isList) {
        editor
          .unwrapBlock(type == NodeType.BulletedList ? NodeType.NumberedList : NodeType.BulletedList)
          .wrapBlock(type);
      } else {
        editor.setBlocks(NodeType.ListItem).wrapBlock(type);
      }
    }
  };

  onClickLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const hasLinks = this.isLinkActive();

    if (hasLinks) {
      editor.command(this.unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt('Enter the URL of the link:');

      if (href === null) {
        return;
      }

      editor.command(this.wrapLink, href);
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
        .command(this.wrapLink, href);
    }
  };

  onClickImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const src = window.prompt('Enter the URL of the image:');
    if (!src) return;
    this.editor.command(insertImage, src);
    return true;
  };

  plugins = [
    CollapseOnEscape(),
    PasteLinkify({
      isActiveQuery: this.isLinkActive,
      wrapCommand: this.wrapLink,
      unwrapCommand: this.unwrapLink,
    }),
  ];

  render() {
    return (
      <div style={{ margin: '40px' }}>
        <Flex>
          <PrototypeButton onMouseDown={() => this.undo()}>Undo</PrototypeButton>
          <PrototypeButton onMouseDown={() => this.redo()}>Redo</PrototypeButton>
        </Flex>
        <Flex>
          {this.renderMarkButton(MarkType.BOLD)}
          {this.renderMarkButton(MarkType.ITALIC)}
          {this.renderMarkButton(MarkType.UNDERLINED)}
          <PrototypeButton onMouseDown={this.onClickLink}>Link</PrototypeButton>
        </Flex>
        <Flex>
          {this.renderBlockButton(NodeType.NumberedList)}
          {this.renderBlockButton(NodeType.BulletedList)}
          {this.renderBlockButton(NodeType.Title)}
          {this.renderBlockButton(NodeType.Subtitle)}
          <PrototypeButton onMouseDown={this.onClickImage}>Image</PrototypeButton>
        </Flex>
        <Flex>
          <Editor
            spellCheck
            autoFocus
            placeholder="Enter some text..."
            ref={this.ref}
            value={this.state.value}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            onChange={this.onChange}
            plugins={this.plugins}
            schema={schema}
          />
          <pre style={{ width: '50%', wordWrap: 'break-word' }}>
            {JSON.stringify(this.state.value.toJSON(), null, 2)}
          </pre>
        </Flex>
      </div>
    );
  }
}
