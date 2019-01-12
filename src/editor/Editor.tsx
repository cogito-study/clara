import { Box, Button, Heading, Image } from 'grommet';
import React, { Fragment, MouseEvent, PureComponent } from 'react';
import { Editor as CoreEditor, Range, RangeJSON, SchemaProperties, Value, ValueJSON } from 'slate';
import CollapseOnEscape from 'slate-collapse-on-escape';
// import { PasteLinkify } from 'slate-paste-linkify';
import { Editor as SlateEditor, EditorProps as SlateEditorProps, Plugin } from 'slate-react';

import commentButtonImage from '../assets/images/commentButton.svg';

import { MarkType } from './enums/MarkType';
import { Comments } from './plugins/Comments';
import { History } from './plugins/History';
import { Images } from './plugins/Images';
import { Links } from './plugins/Links';
import { RichText } from './plugins/RichText';
import { HoverContainer } from './ProtoComponents';

export interface CommentButtonPosition {
  top: number;
  left: number;
}

export interface CommentLocation {
  id: string;
  range: RangeJSON;
}
interface Props {
  title: string;
  canShowComments: boolean;
  initialValue: ValueJSON;
  commentLocations: CommentLocation[];
  onCommentClick: (id: number, marginTop: number) => void;
  onCreateComment: (locationInText: string, marginTop: number) => void;
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
    if (this.props.commentLocations !== prevProps.commentLocations) {
      this.toggleComments(this.props.commentLocations);
    }
  }

  calculateSelectionPosition = () =>
    window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();

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
      const rect = this.calculateSelectionPosition();

      this.setState({
        commentButtonPosition: {
          top: rect.top + window.pageYOffset - 53,
          left: rect.left + window.pageXOffset + rect.width - 16,
        },
      });
    }
  };

  toggleComments = (commentLocations: CommentLocation[]) => {
    const { canShowComments } = this.props;

    commentLocations.forEach(({ id, range }: CommentLocation) => {
      const commentRange = Range.fromJSON(range);

      canShowComments
        ? this.editor.select(commentRange).addMark({ type: MarkType.Comment, data: { id } })
        : this.editor.select(commentRange).removeMark({ type: MarkType.Comment, data: { id } });
    });

    this.editor.moveToEnd().blur();
  };

  onChange = ({ value }) => {
    this.updateCommentButtonPosition(value);
    this.setState({ value });
  };

  onCreateComment = (event: MouseEvent<any>) => {
    event.preventDefault();
    const selectionJSON = this.editor.value.selection.toJSON();
    const marginTop = this.calculateSelectionPosition().top;
    this.props.onCreateComment(JSON.stringify(selectionJSON), marginTop);
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
          <Box align="center" style={{ transition: 'all 0.1s ease-in-out' }}>
            <Button plain icon={<Image src={commentButtonImage} width="125px" />} onMouseDown={this.onCreateComment} />
          </Box>
        </HoverContainer>
      </Fragment>
    );
  };

  render() {
    const { value } = this.state;
    const { title, canShowComments } = this.props;

    return (
      <Box margin={{ vertical: 'medium', horizontal: 'xsmall' }} style={{ maxWidth: '1000px' }}>
        <Heading level="2" margin={{ left: 'small', right: 'none', vertical: 'none' }}>
          {title}
        </Heading>
        <Box background="white" elevation="small" round="medium" pad="large" margin={{ top: 'medium' }} gap="medium">
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
      </Box>
    );
  }
}
