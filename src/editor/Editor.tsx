import React, { Component, Fragment } from 'react';

import { Box, Button } from 'grommet';
import { Editor } from 'slate-react';
import { Value, Range } from 'slate';

import CollapseOnEscape from 'slate-collapse-on-escape';

import MarkType from './MarkType';
import { HoverContainer, CommentBoxContainer } from './ProtoComponents';

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
  top: number;
  left: number;
}

interface EditorProps {
  initialValue: string;
}
interface EditorState {
  value: Value;
  selectedComments: Comment[];
  readonly: boolean;
  commentButtonState: CommentButtonState;
  commentBoxTop: number;
  selectedCommentId: number;
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
    selectedComments: [],
    commentButtonState: { left: -10000, top: -10000 },
    selectedCommentId: -1,
    commentBoxTop: -1,
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
    this.plugins = [Comments(this.createComment, this.onClickComment), ...this.plugins];
  }

  onClickComment = (top: number, id: number) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        commentBoxTop: top,
        selectedCommentId: id,
      };
    });
  };

  editorRef = (editor) => {
    this.editor = editor;
  };

  commentButtonRef = (commentButton) => {
    this.commentButton = commentButton;
  };

  commentBoxRef = (commentBox) => {
    this.commentBox = commentBox;
  };

  updateCommentButton = (value) => {
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      this.setState({
        commentButtonState: { left: -10000, top: -10000 },
      });
    } else {
      const native = window.getSelection();
      const range = native.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      this.setState({
        commentButtonState: {
          top: rect.top + window.pageYOffset - 30,
          left: rect.left + window.pageXOffset - this.commentButton.offsetWidth / 2 + rect.width / 2,
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
      for (const comment of this.state.comments) {
        this.editor.select(comment.range).addMark({ type: MarkType.COMMENT, data: { id: comment.id } });
      }
      this.editor.moveToEnd().blur();
    });
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
    this.updateCommentButton(value);
    this.setState({ value });
  };

  renderEditor = (_props, _editor, next) => {
    const children = next();

    const {
      commentButtonState: { left: buttonLeft, top: buttonTop },
    } = this.state;
    return (
      <Fragment>
        {children}
        <HoverContainer shown={true} innerRef={this.commentButtonRef} left={buttonLeft} top={buttonTop}>
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
      </Fragment>
    );
  };

  render() {
    const { value, commentBoxTop, comments, selectedCommentId } = this.state;

    return (
      <Box flex direction="row">
        <Box height="auto" background="light" elevation="medium" round="small" pad="40px" gap="medium">
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
        <div ref={this.commentBoxRef}>
          <Box width="medium">
            <CommentBoxContainer top={commentBoxTop - 40}>
              {selectedCommentId > 0 ? comments.find((comment) => comment.id === selectedCommentId)!.text : undefined}
            </CommentBoxContainer>
          </Box>
        </div>
      </Box>
    );
  }
}
