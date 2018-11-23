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

import History, { undo, redo } from './History';
import Links, { isLinkActive, wrapLink, unwrapLink, onClickLink } from './Links';
import Images, { onClickImage } from './Images';

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

interface EditorState {
  value: Value;
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
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  hasMark = (type: MarkType) => {
    const { value } = this.state;
    return value.activeMarks.some((mark) => mark.type == type);
  };

  hasBlock = (type: NodeType) => {
    const { value } = this.state;
    return value.blocks.some((node) => node.type == type);
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

  plugins = [
    History(),
    Images(),
    Links(),
    CollapseOnEscape(),
    PasteLinkify({
      isActiveQuery: () => isLinkActive(this.state.value),
      wrapCommand: wrapLink,
      unwrapCommand: unwrapLink,
    }),
  ];

  render() {
    const { editor } = this;
    return (
      <div style={{ margin: '40px' }}>
        <Flex>
          <PrototypeButton onMouseDown={() => undo(editor)}>Undo</PrototypeButton>
          <PrototypeButton onMouseDown={() => redo(editor)}>Redo</PrototypeButton>
        </Flex>
        <Flex>
          {this.renderMarkButton(MarkType.BOLD)}
          {this.renderMarkButton(MarkType.ITALIC)}
          {this.renderMarkButton(MarkType.UNDERLINED)}
          <PrototypeButton onMouseDown={(e) => onClickLink(e, editor)}>Link</PrototypeButton>
        </Flex>
        <Flex>
          {this.renderBlockButton(NodeType.NumberedList)}
          {this.renderBlockButton(NodeType.BulletedList)}
          {this.renderBlockButton(NodeType.Title)}
          {this.renderBlockButton(NodeType.Subtitle)}
          <PrototypeButton onMouseDown={(e) => onClickImage(e, editor)}>Image</PrototypeButton>
        </Flex>
        <Editor
          spellCheck
          autoFocus
          readOnly
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
        <pre style={{ width: '50%', wordWrap: 'break-word' }}>{JSON.stringify(this.state.value.toJSON(), null, 2)}</pre>
      </div>
    );
  }
}
