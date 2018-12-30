import React, { FunctionComponent, useState, useRef, Suspense } from 'react';
import gql from 'graphql-tag';
import { Box, Button } from 'grommet';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NoteRouteParams } from '../types/RouteParams';
import Editor, { CommentLocation } from '../editor/Editor';
import { NoteCommentContainer } from './NoteCommentContainer';
import { Spinner } from '../ui/components';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NOTE_QUERY = gql`
  query NoteQuery($noteID: Int!) {
    note(noteId: $noteID) {
      title
      text
      comments {
        id
        locationInText
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation SubmitComment($noteID: Int!, $commentData: CommentInput!) {
    commentNote(noteId: $noteID, commentData: $commentData) {
      note {
        id
        comments {
          id
          locationInText
        }
      }
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($commentID: Int!) {
    deleteComment(commentId: $commentID) {
      success
    }
  }
`;

const mapCommentToLocations = (comment: any): CommentLocation => ({
  id: comment.id,
  range: JSON.parse(comment.locationInText),
});

export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match }) => {
  const { noteID } = match.params;

  const spacerRef = useRef<HTMLDivElement | null>(null);

  const [selectedCommentID, setSelectedCommentID] = useState<number | undefined>(undefined);
  const [canShowComments, setShowComments] = useState(false);
  const [shouldDisplayNewComment, setShouldDisplayNewComment] = useState(false);
  const [newCommentLocationInText, setNewCommentLocationInText] = useState('');
  const [commentMarginTop, setCommentMarginTop] = useState<number>(-10000);

  const { data: noteQueryData } = useQuery(NOTE_QUERY, { variables: { noteID } });
  const submitComment = useMutation(SUBMIT_COMMENT_MUTATION, {
    refetchQueries: [{ query: NOTE_QUERY, variables: { noteID } }],
  });
  const deleteComment = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { commentID: selectedCommentID },
    refetchQueries: [{ query: NOTE_QUERY, variables: { noteID } }],
  });

  useDocumentTitle(noteQueryData.note.title);

  const calculateRelativeMarginTop = (): number =>
    commentMarginTop - (spacerRef.current ? spacerRef.current.offsetTop : 0);

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

  const onCommentDelete = () => deleteComment().then(() => setSelectedCommentID(undefined));

  const onCommentClick = (id: number, marginTop: number) => {
    setShouldDisplayNewComment(false);
    setSelectedCommentID(id);
    setCommentMarginTop(marginTop);
  };

  const toggleComments = () => {
    setShowComments(!canShowComments);
    setSelectedCommentID(undefined);
  };

  const renderEditor = (note: any) => {
    const { title, text, comments } = note;
    return (
      <Box flex>
        <Editor
          title={title}
          canShowComments={canShowComments}
          initialValue={JSON.parse(text)}
          commentLocations={comments.map(mapCommentToLocations)}
          onCreateComment={onCreateComment}
          onCommentClick={onCommentClick}
        />
      </Box>
    );
  };

  const renderCommentLoading = () => (
    <Box margin={{ top: `${calculateRelativeMarginTop()}px` }}>
      <Spinner primary />
    </Box>
  );

  return (
    <Box fill justify="start" align="start" pad="small" direction="row">
      <Button primary onClick={toggleComments}>
        {canShowComments ? 'Hide' : 'Show'} Comments
      </Button>

      {noteQueryData && noteQueryData.note && renderEditor(noteQueryData.note)}

      <Box justify="center" align="center" pad="none" basis="1/3">
        <div ref={spacerRef}>
          <Suspense fallback={renderCommentLoading()}>
            <NoteCommentContainer
              marginTop={calculateRelativeMarginTop()}
              selectedCommentID={selectedCommentID}
              canShowComments={canShowComments}
              shouldDisplayNewComment={shouldDisplayNewComment}
              onCommentDelete={onCommentDelete}
              onNewCommentCancel={() => setShouldDisplayNewComment(false)}
              onNewCommentDone={onCreateCommentDone}
            />
          </Suspense>
        </div>
      </Box>
    </Box>
  );
};
