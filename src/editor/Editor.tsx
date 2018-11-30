import React from 'react';

import { Editor } from 'slate-react';
import { Value, Range } from 'slate';

import CollapseOnEscape from 'slate-collapse-on-escape';
import PasteLinkify from 'slate-paste-linkify';

import testValue from './testValue.json';
import NodeType from './NodeType';
import MarkType from './MarkType';
import { PrototypeButton, Flex, HoverContainer } from './ProtoComponents';

import History, { undo, redo } from './History';
import Links, { isLinkActive, wrapLink, unwrapLink, onClickLink } from './Links';
import Images, { onClickImage } from './Images';
import RichText, { hasBlock } from './RichText';
import Comments from './Comments';

// testing
interface Comment {
  id: number;
  text: string;
  range: Range;
}

interface CommentButtonState {
  shown: boolean;
  top: number;
  left: number;
}
interface EditorState {
  value: Value;
  readonly: boolean;
  commentButtonState: CommentButtonState;
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
  commentButton!: HTMLButtonElement;

  editorRef = (editor) => {
    this.editor = editor;
  };

  commentButtonRef = (commentButton) => {
    this.commentButton = commentButton;
  };

  state: EditorState = {
    value: Value.fromJSON(testValue),
    readonly: false,
    comments: [],
    commentButtonState: { shown: false, left: 0, top: 0 },
  };

  updateMenu = (value) => {
    const { commentButtonState } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      this.setState({ commentButtonState: { ...commentButtonState, shown: false } });
    } else {
      const native = window.getSelection();
      const range = native.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      this.setState({
        commentButtonState: {
          top: rect.top + window.pageYOffset - this.commentButton.offsetHeight,
          left: rect.left + window.pageXOffset - this.commentButton.offsetWidth / 2 + rect.width / 2,
          shown: true,
        },
      });
    }
  };

  createComment = () => {
    const { comments } = this.state;
    const id = Date.now();
    const text = prompt('Comment text');
    const range = Range.createProperties(this.editor.value.selection);
    this.setState({ comments: [...comments, { text, id, range }] }, () => {
      this.editor.addMark({ type: MarkType.COMMENT, data: { id } }).moveToEnd();
    });
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
    this.updateMenu(value);
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

  renderEditor = (_props, _editor, next) => {
    const children = next();
    const {
      commentButtonState: { shown, left, top },
    } = this.state;
    return (
      <React.Fragment>
        {children}
        <HoverContainer shown={shown} innerRef={this.commentButtonRef} left={left} top={top}>
          <PrototypeButton
            onMouseDown={(e) => {
              e.preventDefault();
              this.createComment();
            }}
          >
            Comment
          </PrototypeButton>
        </HoverContainer>
      </React.Fragment>
    );
  };

  render() {
    const {
      editor,
      state: { readonly, value },
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
        <Editor
          spellCheck
          autoFocus
          readOnly={readonly}
          placeholder="Enter some text..."
          ref={this.editorRef}
          onChange={this.onChange}
          value={this.state.value}
          plugins={this.plugins}
          schema={schema}
          renderEditor={this.renderEditor}
          role={'editor'}
        />
        <hr />
        <div>
          {value.marks.map(
            (mark) =>
              mark.type === MarkType.COMMENT && (
                <p key={mark.data.get('id')}>
                  <em>{mark.data.get('id')}</em>
                </p>
              ),
          )}
        </div>
      </div>
    );
  }
}
