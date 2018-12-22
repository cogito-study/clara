import React, { Component, Fragment, MouseEvent } from 'react';

import { Box, Button, Heading } from 'grommet';
import { Editor as SlateEditor } from 'slate-react';
import { Value, Range } from 'slate';

import CollapseOnEscape from 'slate-collapse-on-escape';

import MarkType from './MarkType';
import { HoverContainer } from './ProtoComponents';

import Images from './Images';
import Links from './Links';
import RichText from './RichText';
import Comments from './Comments';
import ReadOnlyPlugin from './ReadOnlyPlugin';

export interface CommentButtonPosition {
  top: number;
  left: number;
}

export interface CommentLocation {
  id: number;
  range: JSON;
}
interface Props {
  title: string;
  initialValue: JSON;
  commentLocations: CommentLocation[];
  onCommentClick: (id: number, marginTop: number) => void;
  onCreateComment: (locationInText: string) => void;
}
interface State {
  value: Value;
  showComments: boolean;
  commentButtonPosition: CommentButtonPosition;
}

const schema = {
  blocks: {
    image: {
      isVoid: true,
    },
  },
};

export default class Editor extends Component<Props, State> {
  editor!: SlateEditor;
  commentButton!: HTMLElement;
  canDisplayComments: () => boolean;
  plugins: any[];

  constructor(props: Props) {
    super(props);

    this.state = {
      value: Value.fromJSON(this.props.initialValue),
      showComments: false,
      commentButtonPosition: { top: -10000, left: -10000 },
    };

    this.canDisplayComments = () => this.state.showComments;

    this.plugins = [
      // History(),
      ReadOnlyPlugin(),
      Images(),
      Links(),
      RichText(),
      Comments((id: number, top: number) => this.props.onCommentClick(id, top), this.canDisplayComments),
      this.canDisplayComments,
      // PasteLinkify({
      //   isActiveQuery: () => isLinkActive(this.state.value),
      //   wrapCommand: wrapLink,
      //   unwrapCommand: unwrapLink,
      // }),
      CollapseOnEscape(),
    ];
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.commentLocations !== prevProps.commentLocations) {
      this.toggleComments(this.props.commentLocations);
    }
  }

  editorRef = (editor) => {
    this.editor = editor;
  };

  commentButtonRef = (commentButton) => {
    this.commentButton = commentButton;
  };

  updateCommentButtonPosition = (value) => {
    const { showComments } = this.state;
    const { fragment, selection } = value;

    if (!showComments) {
      return;
    }

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      this.setState({
        commentButtonPosition: { left: -10000, top: -10000 },
      });
    } else {
      const native = window.getSelection();
      const range = native.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      this.setState({
        commentButtonPosition: {
          top: rect.top + window.pageYOffset - 40,
          left: rect.left + window.pageXOffset - this.commentButton.offsetWidth / 2 + rect.width / 2,
        },
      });
    }
  };

  toggleComments = (commentLocations: CommentLocation[]) => {
    const { showComments } = this.state;
    for (const commentLocation of commentLocations) {
      const range = Range.createProperties(commentLocation.range);
      this.editor.select(range);
      if (showComments) {
        this.editor.addMark({ type: MarkType.COMMENT, data: { id: commentLocation.id } });
      } else {
        this.editor.removeMark({ type: MarkType.COMMENT, data: { id: commentLocation.id } });
      }
    }
    this.editor.moveToEnd().blur();
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
    this.updateCommentButtonPosition(value);
    this.setState({ value });
  };

  onCreateComment = (event: MouseEvent<any>) => {
    event.preventDefault();
    const range = Range.createProperties(this.editor.value.selection);
    this.props.onCreateComment(JSON.stringify(range));
  };

  renderEditor = (_props, _editor, next) => {
    const children = next();

    const { left: buttonLeft, top: buttonTop } = this.state.commentButtonPosition;
    return (
      <Fragment>
        {children}
        <HoverContainer shown={true} innerRef={this.commentButtonRef} left={buttonLeft} top={buttonTop}>
          <Button primary onMouseDown={this.onCreateComment}>
            Comment
          </Button>
        </HoverContainer>
      </Fragment>
    );
  };

  render() {
    const { value, showComments } = this.state;
    const { title } = this.props;

    return (
      <div>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            this.setState({ showComments: !showComments }, () => this.toggleComments(this.props.commentLocations));
          }}
        >
          showComments: {showComments ? 'true' : 'false'}
        </button>
        <Box background="light" elevation="medium" round="small" pad="large" gap="medium">
          <Heading level="2" margin="none">
            {title}
          </Heading>
          <SlateEditor
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
      </div>
    );
  }
}
