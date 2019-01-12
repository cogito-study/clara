import { Box, Button, Image, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, Suspense, useContext, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import BackIcon from '../../assets/images/BackIcon.svg';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import CommentIcon from '../../assets/images/CommentIcon.svg';
import Editor, { CommentLocation } from '../../editor/Editor';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { NoteRouteParams } from '../../types/RouteParams';
import { Spinner } from '../../ui/components';
import { NoteCommentContainer } from '../NoteComment/NoteCommentContainer';
import { DELETE_COMMENT_MUTATION } from './DeleteCommentMutation';
import { NOTE_QUERY } from './NoteQuery';
import { SUBMIT_COMMENT_MUTATION } from './SubmitCommentMutation';
import { DeleteCommentMutation, DeleteCommentMutationVariables } from './__generated__/DeleteCommentMutation';
import { NoteQuery, NoteQueryVariables, NoteQuery_note, NoteQuery_note_comments } from './__generated__/NoteQuery';
import { SubmitCommentMutation, SubmitCommentMutationVariables } from './__generated__/SubmitCommentMutation';

const mapCommentToLocations = (comment: NoteQuery_note_comments): CommentLocation => ({
  id: comment.id,
  range: comment.locationInText,
});

// tslint:disable:cyclomatic-complexity
export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match, history }) => {
  const { noteID } = match.params;

  // tslint:disable:no-null-keyword
  const commentBoxSpacerRef = useRef<HTMLDivElement | null>(null);
  const editorToolBoxSpacerRef = useRef<HTMLDivElement | null>(null);
  // tslint:enable:no-null-keyword

  const screenSize = useContext(ResponsiveContext);

  const [selectedCommentID, setSelectedCommentID] = useState<number | undefined>(undefined);
  const [canShowUI, setShowUI] = useState(false);
  const [shouldDisplayNewComment, setShouldDisplayNewComment] = useState(false);
  const [newCommentLocationInText, setNewCommentLocationInText] = useState('');
  const [commentMarginTop, setCommentMarginTop] = useState<number>(-10000);
  const [toolBoxMarginTop, setToolBoxMarginTop] = useState<number>(-10000);
  const [editorToolsContainer, setEditorToolsContainer] = useState<JSX.Element | undefined>(undefined);

  const commentID = selectedCommentID ? selectedCommentID.toString() : '';

  const { data: noteQueryData } = useQuery<NoteQuery, NoteQueryVariables>(NOTE_QUERY, { variables: { noteID } });
  const submitComment = useMutation<SubmitCommentMutation, SubmitCommentMutationVariables>(SUBMIT_COMMENT_MUTATION, {
    refetchQueries: [{ query: NOTE_QUERY, variables: { noteID } }],
  });
  const deleteComment = useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DELETE_COMMENT_MUTATION, {
    refetchQueries: [{ query: NOTE_QUERY, variables: { noteID } }],
  });

  useDocumentTitle(noteQueryData && noteQueryData.note ? noteQueryData.note.title : '');

  const calculateRelativeMarginTop = (spacerRef: React.RefObject<HTMLDivElement>, marginTop: number): number =>
    marginTop - (spacerRef.current ? spacerRef.current.offsetTop : 0);

  const onCreateComment = (locationInText: string, marginTop: number) => {
    setShouldDisplayNewComment(true);
    setSelectedCommentID(undefined);
    setCommentMarginTop(marginTop);
    setNewCommentLocationInText(locationInText);
  };

  const onCreateCommentDone = (commentText: string) => {
    if (commentText) {
      submitComment({
        variables: { noteID, commentData: { text: commentText, locationInText: newCommentLocationInText } },
      }).then(() => setShouldDisplayNewComment(false));
    }
  };

  const onCommentDelete = () => deleteComment({ variables: { commentID } }).then(() => setSelectedCommentID(undefined));

  const onCommentClick = (id: number, marginTop: number) => {
    setShouldDisplayNewComment(false);
    setSelectedCommentID(id);
    setCommentMarginTop(marginTop);
  };

  const toggleComments = () => {
    setShowUI(!canShowUI);
    setSelectedCommentID(undefined);
  };

  const onSelectionChanged = (cursorY: number) => {
    setToolBoxMarginTop(cursorY);
  };

  const renderEditor = ({ title, text, comments }: NoteQuery_note) => (
    <Box width="xlarge" justify="center" align="center">
      <Editor
        title={title}
        canShowComments={canShowUI}
        initialValue={text}
        commentLocations={comments ? comments.map(mapCommentToLocations) : []}
        onCreateComment={onCreateComment}
        onCommentClick={onCommentClick}
        onSelectionChanged={onSelectionChanged}
        renderEditorToolsCallBack={(container: JSX.Element) => setEditorToolsContainer(container)}
      />
    </Box>
  );

  const renderCommentLoading = () => (
    <Box margin={{ top: `${calculateRelativeMarginTop(commentBoxSpacerRef, commentMarginTop)}px` }}>
      <Spinner primary />
    </Box>
  );

  return (
    <Box justify="center" alignContent="center" align="start" pad="xsmall" direction="row">
      {screenSize === 'small' ? (
        <div />
      ) : (
        <Box direction="column" align="start" pad="none">
          <Button
            margin={{ top: 'xlarge' }}
            color="gray"
            label={true}
            icon={<Image src={BackIcon} width="20px" />}
            onClick={history.goBack}
          />
          <div ref={editorToolBoxSpacerRef}>
            {canShowUI && editorToolBoxSpacerRef.current && (
              <div
                style={{
                  marginTop:
                    editorToolBoxSpacerRef.current.offsetTop > toolBoxMarginTop
                      ? 0
                      : toolBoxMarginTop - editorToolBoxSpacerRef.current.offsetTop,
                }}
              >
                {editorToolsContainer}
              </div>
            )}
          </div>
        </Box>
      )}
      <Box width="large" margin={{ horizontal: 'small', vertical: 'medium' }} justify="center">
        {noteQueryData && noteQueryData.note && renderEditor(noteQueryData.note)}
      </Box>
      {screenSize === 'small' ? (
        <div />
      ) : (
        <Box direction="column" align="start" width="320px">
          <Button
            reverse
            margin={{ top: 'xlarge' }}
            color={canShowUI ? 'error' : 'primary'}
            label={canShowUI ? 'Elrejtés' : 'Javaslatok'}
            icon={canShowUI ? <Image src={CloseIcon} width="20px" /> : <Image src={CommentIcon} width="20px" />}
            onClick={toggleComments}
          />
          <Box justify="center" align="start" pad="none">
            <div ref={commentBoxSpacerRef}>
              <Suspense fallback={renderCommentLoading()}>
                <NoteCommentContainer
                  marginTop={calculateRelativeMarginTop(commentBoxSpacerRef, commentMarginTop)}
                  selectedCommentID={selectedCommentID}
                  canShowComments={canShowUI}
                  shouldDisplayNewComment={shouldDisplayNewComment}
                  onCommentDelete={onCommentDelete}
                  onNewCommentCancel={() => setShouldDisplayNewComment(false)}
                  onNewCommentDone={onCreateCommentDone}
                />
              </Suspense>
            </div>
          </Box>
        </Box>
      )}
    </Box>
  );
};
