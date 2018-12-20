import React, { Component, Fragment } from 'react';

import { Box, Button } from 'grommet';
import { Editor } from 'slate-react';
import { Value, Range } from 'slate';

import CollapseOnEscape from 'slate-collapse-on-escape';

import MarkType from './MarkType';
import { HoverContainer } from './ProtoComponents';

import Images from './Images';
import Links from './Links';
import RichText from './RichText';
import Comments from './Comments';
import ReadOnlyPlugin from './ReadOnlyPlugin';

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

interface CommentBoxState {
  selectedComments: Comment[];
  top: number;
  left: number;
}

interface EditorProps {
  initialValue: string;
}
interface EditorState {
  value: Value;
  readonly: boolean;
  commentButtonState: CommentButtonState;
  commentBoxState: CommentBoxState;
  comments: Comment[];
}

const schema = {
  blocks: {
    image: {
      isVoid: true,
    },
  },
};

export default class CogitoEditor extends Component<EditorProps, EditorState> {
  editor!: Editor;
  commentButton!: HTMLElement;
  commentBox!: HTMLElement;

  state: EditorState = {
    value: Value.fromJSON(JSON.parse(this.props.initialValue)),
    readonly: false,
    comments: [],
    commentButtonState: { shown: false, left: -10000, top: -10000 },
    commentBoxState: { selectedComments: [], left: -10000, top: -10000 },
  };

  plugins = [
    // History(),
    ReadOnlyPlugin(),
    Images(),
    Links(),
    RichText(),
    // PasteLinkify({
    //   isActiveQuery: () => isLinkActive(this.state.value),
    //   wrapCommand: wrapLink,
    //   unwrapCommand: unwrapLink,
    // }),
    CollapseOnEscape(),
  ];

  constructor(props: any) {
    super(props);
    this.plugins = [Comments(this.createComment), ...this.plugins];
  }

  editorRef = (editor) => {
    this.editor = editor;
  };

  commentButtonRef = (commentButton) => {
    this.commentButton = commentButton;
  };

  commentBoxRef = (commentBox) => {
    this.commentBox = commentBox;
  };

  updateComments = (value) => {
    const { comments } = this.state;
    const { fragment, selection, marks } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      this.setState({
        commentButtonState: { left: -10000, top: -10000, shown: false },
        commentBoxState: { left: -10000, top: -10000, selectedComments: [] },
      });
    } else {
      const native = window.getSelection();
      const range = native.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const commentsUnderSelection = marks.filter((mark) => mark.type === MarkType.COMMENT);

      if (marks.size > 0) {
        const selectedMarkIds = commentsUnderSelection.map((mark) => mark.data.get('id')).toArray();
        const selectedComments = comments.filter((comment) => selectedMarkIds.includes(comment.id));
        this.setState({
          commentBoxState: {
            selectedComments,
            top: rect.bottom + 5,
            left: rect.left + window.pageXOffset - this.commentBox.offsetWidth / 2 + rect.width / 2,
          },
        });
      } else {
        this.setState({
          commentBoxState: {
            selectedComments: [],
            top: -10000,
            left: -10000,
          },
        });
      }

      this.setState({
        commentButtonState: {
          top: rect.top + window.pageYOffset - 30,
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
    if (!text) {
      return;
    }
    const range = Range.createProperties(this.editor.value.selection);
    this.setState({ comments: [...comments, { text, id, range }] }, () => {
      this.editor.addMark({ type: MarkType.COMMENT, data: { id } }).blur();
    });
    return id;
  };

  // onClickMark = (event: React.MouseEvent<HTMLButtonElement>, type: MarkType) => {
  //   event.preventDefault();
  //   this.editor.toggleMark(type);
  // };

  // onClickBlock = (event: React.MouseEvent<HTMLButtonElement>, type: NodeType) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   const { editor } = this;
  //   const { value } = editor;
  //   const { document } = value;

  //   const DEFAULT_NODE = NodeType.Paragraph;

  //   // Handle everything but list buttons.
  //   if (type !== NodeType.BulletedList && type !== NodeType.NumberedList) {
  //     const isActive = hasBlock(type, value);
  //     const isList = hasBlock(NodeType.ListItem, value);

  //     if (isList) {
  //       editor
  //         .setBlocks(isActive ? DEFAULT_NODE : type)
  //         .unwrapBlock(NodeType.BulletedList)
  //         .unwrapBlock(NodeType.NumberedList);
  //     } else {
  //       editor.setBlocks(isActive ? DEFAULT_NODE : type);
  //     }
  //   } else {
  //     // Handle the extra wrapping required for list buttons.
  //     const isList = hasBlock(NodeType.ListItem, value);
  //     // Same type as one given in argument
  //     const sameType = value.blocks.some((block) => {
  //       return !!document.getClosest(block.key, (parent) => parent.type === type);
  //     });

  //     if (isList && sameType) {
  //       editor
  //         .setBlocks(DEFAULT_NODE)
  //         .unwrapBlock(NodeType.BulletedList)
  //         .unwrapBlock(NodeType.NumberedList);
  //     } else if (isList) {
  //       editor
  //         .unwrapBlock(type === NodeType.BulletedList ? NodeType.NumberedList : NodeType.BulletedList)
  //         .wrapBlock(type);
  //     } else {
  //       editor.setBlocks(NodeType.ListItem).wrapBlock(type);
  //     }
  //   }
  // };

  // renderMarkButton = (type: MarkType) => {
  //   return (
  //     <Button primary onMouseDown={(e) => this.onClickMark(e, type)}>
  //       {type}
  //     </Button>
  //   );
  // };

  // renderBlockButton = (type: NodeType) => {
  //   return (
  //     <Button primary onMouseDown={(e) => this.onClickBlock(e, type)}>
  //       {type}
  //     </Button>
  //   );
  // };

  onChange = ({ value }) => {
    this.updateComments(value);
    this.setState({ value });
  };

  renderEditor = (_props, _editor, next) => {
    const children = next();

    const {
      commentButtonState: { shown, left: buttonLeft, top: buttonTop },
      commentBoxState: { selectedComments, left: commentsLeft, top: commentsTop },
    } = this.state;
    return (
      <Fragment>
        {children}
        <HoverContainer shown={shown} innerRef={this.commentButtonRef} left={buttonLeft} top={buttonTop}>
          <Button
            primary
            onMouseDown={(e) => {
              e.preventDefault();
              this.createComment();
            }}
          >
            Comment
          </Button>
        </HoverContainer>
        <HoverContainer
          shown={selectedComments.length > 0}
          innerRef={this.commentBoxRef}
          left={commentsLeft}
          top={commentsTop}
        >
          <div style={{ backgroundColor: 'white', border: '2px solid black', padding: '5px' }}>
            {selectedComments.map((comment) => (
              <p>{comment.text}</p>
            ))}
          </div>
        </HoverContainer>
      </Fragment>
    );
  };

  render() {
    const { value } = this.state;

    return (
      <Box
        width="xlarge"
        background="light"
        elevation="medium"
        justify="center"
        round="small"
        pad="medium"
        gap="medium"
      >
        <Editor
          spellCheck
          autoFocus
          ref={this.editorRef}
          onChange={this.onChange}
          value={value}
          plugins={this.plugins}
          schema={schema}
          renderEditor={this.renderEditor}
          role={'editor'}
        />
      </Box>
    );
  }
}
