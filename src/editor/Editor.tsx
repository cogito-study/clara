import React, { PureComponent, Fragment, MouseEvent } from 'react';
import { Box, Button, Heading } from 'grommet';
import { Editor as SlateEditor, EditorProps as SlateEditorProps, Plugin } from 'slate-react';
import { Value, Range, SchemaProperties, Editor as CoreEditor, ValueJSON, RangeJSON } from 'slate';
import CollapseOnEscape from 'slate-collapse-on-escape';

import { HoverContainer } from './ProtoComponents';
import { MarkType } from './enums/MarkType';
import { History } from './plugins/History';
import { Images } from './plugins/Images';
import { Links } from './plugins/Links';
import { RichText } from './plugins/RichText';
import { Comments } from './plugins/Comments';
import { ReadOnlyPlugin } from './plugins/ReadOnlyPlugin';

export interface CommentButtonPosition {
  top: number;
  left: number;
}

export interface CommentLocation {
  id: number;
  range: RangeJSON;
}
interface Props {
  title: string;
  canShowComments: boolean;
  initialValue: ValueJSON;
  commentLocations: CommentLocation[];
  onCommentClick: (id: number, marginTop: number) => void;
  onCreateComment: (locationInText: string) => void;
}
interface State {
  value: Value;
  commentButtonPosition: CommentButtonPosition;
}

const schema: SchemaProperties = {
  blocks: {
    image: {
      isVoid: true,
    },
  },
};

export default class Editor extends PureComponent<Props, State> {
  editor!: SlateEditor;
  commentButton!: HTMLElement;
  plugins: Plugin[];

  state = {
    value: Value.fromJSON(this.props.initialValue),
    commentButtonPosition: { top: -10000, left: -10000 },
  };

  constructor(props: Props) {
    super(props);

    this.plugins = [
      History(),
      ReadOnlyPlugin(),
      Images(),
      Links(),
      RichText(),
      Comments((id: number, top: number) => props.onCommentClick(id, top)),
      // PasteLinkify({
      //   isActiveQuery: () => isLinkActive(this.state.value),
      //   wrapCommand: wrapLink,
      //   unwrapCommand: unwrapLink,
      // }),
      CollapseOnEscape(),
    ];
  }

  componentDidUpdate(prevProps: Props) {
    const { commentLocations, canShowComments } = this.props;
    if (commentLocations !== prevProps.commentLocations && canShowComments !== prevProps.canShowComments) {
      this.toggleComments(commentLocations);
    }
  }

  updateCommentButtonPosition = (value: Value) => {
    const { canShowComments } = this.props;
    const { fragment, selection } = value;

    if (!canShowComments) {
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
    const { canShowComments } = this.props;

    for (const commentLocation of commentLocations) {
      const range = Range.fromJSON(commentLocation.range);

      canShowComments
        ? this.editor.select(range).addMark({ type: MarkType.Comment, data: { id: commentLocation.id } })
        : this.editor.select(range).removeMark({ type: MarkType.Comment, data: { id: commentLocation.id } });
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

  //   // Handle everything but list buttons.
  //   if (type !== NodeType.BulletedList && type !== NodeType.NumberedList) {
  //     const isActive = hasBlock(type, value);
  //     const isList = hasBlock(NodeType.ListItem, value);

  //     if (isList) {
  //       editor
  //         .setBlocks(isActive ? NodeType.Paragraph : type)
  //         .unwrapBlock(NodeType.BulletedList)
  //         .unwrapBlock(NodeType.NumberedList);
  //     } else {
  //       editor.setBlocks(isActive ? NodeType.Paragraph : type);
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
  //         .setBlocks(NodeType.Paragraph)
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

  renderEditor = (props: SlateEditorProps, editor: CoreEditor, next: () => any) => {
    const children = next();

    const { left, top } = this.state.commentButtonPosition;
    return (
      <Fragment>
        {children}
        <HoverContainer
          shown={true}
          innerRef={(commentButton: HTMLElement) => (this.commentButton = commentButton)}
          left={left}
          top={top}
        >
          <Button primary onMouseDown={this.onCreateComment}>
            Comment
          </Button>
        </HoverContainer>
      </Fragment>
    );
  };

  render() {
    const { value } = this.state;
    const { title, canShowComments } = this.props;

    return (
      <Box background="light" elevation="medium" round="small" pad="large" gap="medium">
        <Heading level="2" margin="none">
          {title}
        </Heading>
        <SlateEditor
          spellCheck
          autoFocus
          ref={(editor: SlateEditor) => (this.editor = editor)}
          onChange={this.onChange}
          value={value}
          plugins={this.plugins}
          schema={schema}
          readOnly={!canShowComments}
          renderEditor={this.renderEditor}
          role="editor"
        />
      </Box>
    );
  }
}
