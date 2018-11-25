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
import Comments, { addComment } from './Comments';

// testing
interface Comment {
  id: number;
  text: string;
}
interface EditorState {
  value: Value;
  readonly: boolean;
  comments: Comment[];
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
    readonly: false,
    comments: [],
  };

  createComment = () => {
    const id = 1;
    const text = prompt('Comment text');
    const { comments } = this.state;
    this.setState({ comments: [...comments, { text, id }] });
    return id;
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
    Comments(this.createComment),
    RichText(),
    CollapseOnEscape(),
    PasteLinkify({
      isActiveQuery: () => isLinkActive(this.state.value),
      wrapCommand: wrapLink,
      unwrapCommand: unwrapLink,
    }),
  ];

  render() {
    const {
      editor,
      state: { readonly, comments },
    } = this;
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
        <Flex>
          <PrototypeButton
            onMouseDown={(e) => {
              e.preventDefault();
              const id = Date.now();
              editor.command(addComment, id);
              this.createComment();
            }}
          >
            Comment
          </PrototypeButton>
        </Flex>
        <Editor
          spellCheck
          autoFocus
          readOnly={readonly}
          placeholder="Enter some text..."
          ref={this.ref}
          onChange={this.onChange}
          value={this.state.value}
          plugins={this.plugins}
          schema={schema}
          role={'editor'}
        />
        <hr />
        <div>
          {comments.map((c) => (
            <p key={c.id}>
              <em>{c.text}</em>
            </p>
          ))}
        </div>
      </div>
    );
  }
}
