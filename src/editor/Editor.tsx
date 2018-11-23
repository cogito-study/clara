import React from 'react';

import { Editor } from 'slate-react';
import { Value } from 'slate';

import CollapseOnEscape from 'slate-collapse-on-escape';
import PasteLinkify from 'slate-paste-linkify';

import testValue from './testValue.json';
import NodeType from './NodeType';
import MarkType from './MarkType';
import { PrototypeButton, Flex } from './ProtoComponents';

import History, { undo, redo } from './History';
import Links, { isLinkActive, wrapLink, unwrapLink, onClickLink } from './Links';
import Images, { onClickImage } from './Images';
import RichText, { hasBlock } from './RichText';

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
      const isActive = hasBlock(type, value);
      const isList = hasBlock(NodeType.ListItem, value);

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
      const isList = hasBlock(NodeType.ListItem, value);
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

  renderMarkButton = (type: MarkType) => {
    return <PrototypeButton onMouseDown={(e) => this.onClickMark(e, type)}>{type}</PrototypeButton>;
  };

  renderBlockButton = (type: NodeType) => {
    return <PrototypeButton onMouseDown={(e) => this.onClickBlock(e, type)}>{type}</PrototypeButton>;
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  plugins = [
    History(),
    Images(),
    Links(),
    RichText(),
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
          plugins={this.plugins}
          schema={schema}
        />
        <pre style={{ width: '50%', wordWrap: 'break-word' }}>{JSON.stringify(this.state.value.toJSON(), null, 2)}</pre>
      </div>
    );
  }
}
