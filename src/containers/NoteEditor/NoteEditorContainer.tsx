import { ApolloError } from 'apollo-client';
import { Box, Button, Image, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, Suspense, useContext, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import BackIcon from '../../assets/images/BackIcon.svg';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import CommentIcon from '../../assets/images/CommentIcon.svg';
import { NotificationContext } from '../../contexts/notification/NotificationContext';
import { UserContext } from '../../contexts/user/UserContext';
import Editor, { CommentLocation } from '../../editor/Editor';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { NoteRouteParams } from '../../types/RouteParams';
import { Spinner } from '../../ui/components';
import { NoteCommentContainer } from '../NoteComment/NoteCommentContainer';
import { DELETE_COMMENT_MUTATION } from './DeleteCommentMutation';
import { NOTE_QUERY } from './NoteQuery';
import { SUBMIT_COMMENT_MUTATION } from './SubmitCommentMutation';
import { UPDATE_NOTE_MUTATION } from './UpdateNoteMutation';
import { UPLOAD_IMAGE_MUTATION } from './UploadImageMutation';
import { DeleteCommentMutation, DeleteCommentMutationVariables } from './__generated__/DeleteCommentMutation';
import { NoteQuery, NoteQueryVariables, NoteQuery_note, NoteQuery_note_comments } from './__generated__/NoteQuery';
import { SubmitCommentMutation, SubmitCommentMutationVariables } from './__generated__/SubmitCommentMutation';
import { UpdateNoteMutation, UpdateNoteMutationVariables } from './__generated__/UpdateNoteMutation';
import { UploadImageMutation, UploadImageMutationVariables } from './__generated__/UploadImageMutation';

const mapCommentToLocations = (comment: NoteQuery_note_comments): CommentLocation => ({
  id: comment.id,
  range: comment.locationInText,
});

// tslint:disable:cyclomatic-complexity
export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match, history }) => {
  const { noteID } = match.params;
  const { showNotification } = useContext(NotificationContext);

  // tslint:disable:no-null-keyword
  const commentBoxSpacerRef = useRef<HTMLDivElement | null>(null);
  const editorToolBoxSpacerRef = useRef<HTMLDivElement | null>(null);

  const screenSize = useContext(ResponsiveContext);

  const user = useContext(UserContext)!;

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
  const updateNote = useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UPDATE_NOTE_MUTATION, {
    refetchQueries: [{ query: NOTE_QUERY, variables: { noteID } }],
  });
  const uploadImage = useMutation<UploadImageMutation, UploadImageMutationVariables>(UPLOAD_IMAGE_MUTATION, {});

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

  const onCommentDelete = () =>
    deleteComment({ variables: { noteID, commentID } }).then(() => setSelectedCommentID(undefined));

  const onNoteUpdate = (noteText: any) =>
    updateNote({ variables: { noteID, noteText } })
      .then(() => showNotification('Változtatások mentése sikeresen megtörtént.', 'success'))
      .catch((error: ApolloError) => error.graphQLErrors.map(({ message }) => showNotification(message, 'error')));

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

  const goBack = () => {
    history.goBack();
  };

  const renderEditor = ({ title, text, comments }: NoteQuery_note) => (
    <Box width="xlarge" justify="center" align="center">
      <Editor
        title={title}
        user={user}
        canShowComments={canShowUI}
        initialValue={text}
        commentLocations={comments ? comments.map(mapCommentToLocations) : []}
        onCreateComment={onCreateComment}
        onCommentClick={onCommentClick}
        onSelectionChanged={onSelectionChanged}
        renderEditorToolsCallBack={(container: JSX.Element) => setEditorToolsContainer(container)}
        onNoteUpdate={onNoteUpdate}
        uploadImageMutation={uploadImage}
      />
    </Box>
  );

  const renderCommentLoading = () => (
    <Box margin={{ top: `${calculateRelativeMarginTop(commentBoxSpacerRef, commentMarginTop)}px` }}>
      <Spinner primary />
    </Box>
  );

  return (
    <Box justify="center" alignContent="center" margin="none" align="start" direction="row">
      {screenSize === 'small' ? (
        <div />
      ) : (
        <Box direction="column" align="start" margin={{ horizontal: 'small' }} pad="none">
          <Button
            margin={{ vertical: 'xlarge' }}
            color="gray"
            label={true}
            icon={<Image src={BackIcon} width="20px" />}
            onClick={goBack}
          />
          <div ref={editorToolBoxSpacerRef}>
            {canShowUI && user.role === 'ADMIN' && editorToolBoxSpacerRef.current && (
              <div
                style={{
                  // TODO: grommetize
                  marginTop:
                    editorToolBoxSpacerRef.current.offsetTop > toolBoxMarginTop
                      ? 0
                      : toolBoxMarginTop - editorToolBoxSpacerRef.current.offsetTop,
                  transition: 'all .4s ease-in-out',
                }}
              >
                {editorToolsContainer}
              </div>
            )}
          </div>
        </Box>
      )}
      <Box width="800px" justify="center">
        {noteQueryData && noteQueryData.note && renderEditor(noteQueryData.note)}
      </Box>
      {screenSize === 'small' ? (
        <div />
      ) : (
        <Box direction="column" align="start" margin={{ horizontal: 'small' }} width="320px">
          <Button
            reverse
            style={{ position: 'fixed' }}
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
