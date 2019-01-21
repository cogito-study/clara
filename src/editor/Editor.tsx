import { Box, Button, Heading, Image } from 'grommet';
import React, { Fragment, MouseEvent, PureComponent, useContext } from 'react';
import { Editor as CoreEditor, Range as SlateRange, RangeJSON, SchemaProperties, Value, ValueJSON } from 'slate';
import CollapseOnEscape from 'slate-collapse-on-escape';
import PasteLinkify from 'slate-paste-linkify';
import { Editor as SlateEditor, EditorProps as SlateEditorProps, Plugin } from 'slate-react';

import { UserContext } from '../contexts/user/UserContext';

import commentButtonImage from '../assets/images/commentButton.svg';

import { MarkType } from './enums/MarkType';
import { Comments, toggleCommentMark as toggleCommentVisible } from './plugins/Comments';
import { History } from './plugins/History';
import { Images } from './plugins/Images';
import { isLinkActive, Links, unwrapLink, wrapLink } from './plugins/Links';
import { ReadOnlyPlugin } from './plugins/ReadOnlyPlugin';
import { RichText } from './plugins/RichText';
import { HoverContainer, renderEditorToolBox } from './ProtoComponents';
import { UserRole } from '../../__generated__/globalTypes';

export interface CommentButtonPosition {
  top: number;
  left: number;
  show: boolean;
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
  onSelectionChanged: (cursorY: number) => void;
  renderEditorToolsCallBack: (container: JSX.Element) => void;
  onNoteUpdate: (text: any) => void;
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
  user = useContext(UserContext)!;

  state = {
    value: Value.fromJSON(this.props.initialValue),
    commentButtonPosition: { top: -10000, left: -10000, show: false },
  };

  constructor(props: Props) {
    super(props);

    this.plugins = [
      Images(),
      Links(),
      RichText(),
      Comments((id: number, top: number) => props.onCommentClick(id, top)),
      CollapseOnEscape(),
    ];

    if (this.user.role === UserRole.ADMIN) {
      this.plugins = [
        History(),
        PasteLinkify({
          isActiveQuery: () => isLinkActive(this.state.value),
          wrapCommand: wrapLink,
          unwrapCommand: unwrapLink,
        }),
        ...this.plugins,
      ];
    } else if (this.user.role === UserRole.USER) {
      this.plugins = [...this.plugins, ReadOnlyPlugin()];
    }
  }

  componentDidMount() {
    const { onNoteUpdate, renderEditorToolsCallBack, onSelectionChanged } = this.props;
    renderEditorToolsCallBack(
      <div>
        <button
          onClick={() => {
            const val = this.setCommentVisibility(this.props.commentLocations, false).toJSON();
            onNoteUpdate(val);
            this.setCommentVisibility(this.props.commentLocations, true);
          }}
        >
          Update
        </button>
        {renderEditorToolBox(this.editor)}
      </div>,
    );

    window.addEventListener('scroll', () => onSelectionChanged(window.scrollY));
  }

  // tslint:disable:cyclomatic-complexity
  componentDidUpdate(prevProps: Props) {
    const { canShowComments, commentLocations } = this.props;
    if (canShowComments !== prevProps.canShowComments) {
      this.setCommentVisibility(this.props.commentLocations, this.props.canShowComments);
    }
    if (commentLocations.length < prevProps.commentLocations.length) {
      const locIds = commentLocations.map((loc) => loc.id);

      prevProps.commentLocations.forEach((location) => {
        if (!locIds.includes(location.id)) {
          this.editor
            .select(SlateRange.fromJSON(location.range))
            .removeMark({ type: MarkType.Comment, data: { id: location.id, show: true } });
        }
      });
    } else if (commentLocations.length > prevProps.commentLocations.length) {
      const locIds = prevProps.commentLocations.map((loc) => loc.id);
      commentLocations.forEach((location) => {
        if (!locIds.includes(location.id)) {
          this.editor
            .select(SlateRange.fromJSON(location.range))
            .addMark({ type: MarkType.Comment, data: { id: location.id, show: true } });
        }
      });
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
    const { commentButtonPosition } = this.state;

    if (!canShowComments) {
      return this.state.commentButtonPosition;
    }

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      return { ...commentButtonPosition, show: false };
    } else {
      const rect = this.calculateSelectionPosition();

      return {
        top: rect.top + window.pageYOffset - 53,
        left: rect.left + window.pageXOffset + rect.width - 16,
        show: true,
      };
    }
  };

  setCommentVisibility = (commentLocations: CommentLocation[], show: boolean) => {
    this.editor.focus();
    commentLocations.forEach(({ id, range }: CommentLocation) => {
      const commentRange = SlateRange.fromJSON(range);
      toggleCommentVisible(this.editor, commentRange, id, show);
    });

    this.editor.moveToStartOfDocument();
    return this.editor.value;
  };

  onChange = ({ value }) => {
    this.setState({ value, commentButtonPosition: this.updateCommentButtonPosition(value) });
  };

  onCreateComment = (event: MouseEvent<any>) => {
    event.preventDefault();
    const selectionJSON = this.editor.value.selection.toJSON();
    const marginTop = this.calculateSelectionPosition().top;
    this.props.onCreateComment(JSON.stringify(selectionJSON), marginTop + window.scrollY);
  };

  renderEditor = (props: SlateEditorProps, editor: CoreEditor, next: () => any) => {
    const children = next();

    const { left, top, show } = this.state.commentButtonPosition;
    return (
      <Fragment>
        {children}
        {show && (
          <HoverContainer
            shown={true}
            innerRef={(commentButton: HTMLElement) => (this.commentButton = commentButton)}
            left={left}
            top={top}
          >
            <Box align="center" style={{ transition: 'all 0.1s ease-in-out' }}>
              <Button
                plain
                icon={<Image src={commentButtonImage} width="125px" />}
                onMouseDown={this.onCreateComment}
              />
            </Box>
          </HoverContainer>
        )}
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
