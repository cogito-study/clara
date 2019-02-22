import { Box, Button, Heading, Image } from 'grommet';
import React, { Fragment, MouseEvent, PureComponent } from 'react';
import { Range as SlateRange, RangeJSON, SchemaProperties, Value, ValueJSON } from 'slate';
import CollapseOnEscape from 'slate-collapse-on-escape';
import PasteLinkify from 'slate-paste-linkify';
import { Editor as SlateEditor, Plugin } from 'slate-react';
import commentButtonImage from '../assets/images/commentButton.svg';
import { UserContextState } from '../contexts/user/UserContext';
import { MarkType } from './enums/MarkType';
import { Comments, toggleCommentMark as toggleCommentVisible } from './plugins/Comments';
import { History } from './plugins/History';
import { Images } from './plugins/Images/Images';
import { isLinkActive, Links, unwrapLink, wrapLink } from './plugins/Links';
import { ReadOnlyPlugin } from './plugins/ReadOnlyPlugin';
import { RichText } from './plugins/RichText';
import { HoverContainer, renderEditorToolBox } from './ProtoComponents';

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
  user: UserContextState;
  onCommentClick: (id: number, marginTop: number) => void;
  onCreateComment: (locationInText: string, marginTop: number) => void;
  onSelectionChanged: (cursorY: number) => void;
  renderEditorToolsCallBack: (container: JSX.Element) => void;
  onNoteUpdate: (text: any) => void;
  uploadImageMutation: any;
}
interface State {
  value: Value;
  lastValue: Value;
  commentButtonPosition: CommentButtonPosition;
  edited: boolean;
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
    lastValue: Value.fromJSON(this.props.initialValue),
    commentButtonPosition: { top: -10000, left: -10000, show: false },
    edited: false,
  };

  constructor(props: Props) {
    super(props);
    const { user, uploadImageMutation } = this.props;
    this.plugins = [
      Images(uploadImageMutation),
      Links(),
      RichText(),
      Comments((id: number, top: number) => props.onCommentClick(id, top)),
      CollapseOnEscape(),
    ];
    if (user.role === 'ADMIN') {
      this.plugins = [
        History(),
        PasteLinkify({
          isActiveQuery: () => isLinkActive(this.state.value),
          wrapCommand: wrapLink,
          unwrapCommand: unwrapLink,
        }),
        ...this.plugins,
      ];
    } else if (user.role === 'USER') {
      this.plugins = [ReadOnlyPlugin(), ...this.plugins];
    }
  }

  componentDidMount() {
    const { onNoteUpdate, renderEditorToolsCallBack, onSelectionChanged, uploadImageMutation } = this.props;
    renderEditorToolsCallBack(
      <Box>
        {renderEditorToolBox(this.editor, uploadImageMutation)}
        <Button
          margin={{ top: 'medium' }}
          label="Mentés"
          color="primary"
          onClick={() => {
            const val = this.setCommentVisibility(this.props.commentLocations, false);
            onNoteUpdate(val.toJSON());
            this.setState({ edited: false, value: val, lastValue: val });
            this.setCommentVisibility(this.props.commentLocations, true);
          }}
        />
      </Box>,
    );

    window.addEventListener('scroll', () => onSelectionChanged(window.scrollY));
    window.onbeforeunload = (e) => {
      const { canShowComments } = this.props;
      console.log(this.state.edited);
      if (this.state.edited && canShowComments) {
        const message = 'Are you sure?';
        e.returnValue = message;
        return message;
      }
      return null;
    };
  }

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
    if (show === false && this.state.edited) {
      // TODO: show popup here
      if (!confirm('Are you sure?')) {
        this.setState({ edited: false, value: this.state.lastValue });
        return this.state.lastValue;
      }
    }
    this.editor.focus();
    commentLocations.forEach(({ id, range }: CommentLocation) => {
      const commentRange = SlateRange.fromJSON(range);
      toggleCommentVisible(this.editor, commentRange, id, show);
    });

    this.editor.moveToStartOfDocument();
    return this.editor.value;
  };

  isMutatingEdit = (operations) => {
    const mutatingOps = operations
      .filter((op) => op.type !== 'set_selection')
      .filter(
        (op) => !(['add_mark', 'set_mark', 'remove_mark'].includes(op.type) && op.mark.type === MarkType.Comment),
      );
    console.log(mutatingOps.map((op) => op.type).toJS());
    return mutatingOps.size > 0;
  };

  onChange = (editor) => {
    const { user, canShowComments } = this.props;
    const { edited } = this.state;
    const { value, operations } = editor;
    const shouldSetEdited =
      (this.isMutatingEdit(operations) && ['ADMIN', 'PROFESSOR'].includes(user.role) && canShowComments) || edited;
    this.setState(
      { value, commentButtonPosition: this.updateCommentButtonPosition(value), edited: shouldSetEdited },
      () => console.log(this.state.edited),
    );
  };

  onCreateComment = (event: MouseEvent<any>) => {
    event.preventDefault();
    const selectionJSON = this.editor.value.selection.toJSON();
    const marginTop = this.calculateSelectionPosition().top;
    this.props.onCreateComment(JSON.stringify(selectionJSON), marginTop + window.scrollY);
  };

  renderEditor = (_props, _editor, next: () => any) => {
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
        <div style={{ display: 'flex' }}>
          <Heading level="2" margin={{ left: 'small', right: 'none', vertical: 'none' }}>
            {title}
          </Heading>
          {this.state.edited && <pre>unsaved</pre>}
        </div>
        <Box
          background="white"
          elevation="small"
          align="center"
          round="medium"
          pad="large"
          margin={{ top: 'medium' }}
          gap="medium"
        >
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
