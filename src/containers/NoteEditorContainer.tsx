import gql from 'graphql-tag';
import { Box, Button, Image } from 'grommet';
import React, { FunctionComponent, Suspense, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import Editor, { CommentLocation } from '../editor/Editor';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NoteRouteParams } from '../types/RouteParams';
import { Spinner } from '../ui/components';
import { NoteCommentContainer } from './NoteCommentContainer';

import BackIcon from '../assets/images/BackIcon.svg';
import CloseIcon from '../assets/images/CloseIcon.svg';
import CommentIcon from '../assets/images/CommentIcon.svg';

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

export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match, history }) => {
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
    console.log('comments', comments);
    return (
      <Box width="xlarge" justify="center" align="center">
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
    <Box justify="center" alignContent="center" align="start" margin="medium" direction="row">
      <Button
        margin={{ top: 'medium' }}
        color="gray"
        label="Vissza"
        icon={<Image src={BackIcon} width="20px" />}
        onClick={history.goBack}
      />
      <Box width="large" margin={{ horizontal: 'small' }} justify="center">
        {noteQueryData && noteQueryData.note && renderEditor(noteQueryData.note)}
      </Box>
      <Box direction="column" align="start" width="320px">
        <Button
          reverse
          margin={{ top: 'medium' }}
          color={canShowComments ? 'error' : 'primary'}
          label={canShowComments ? 'Elrejtés' : 'Javaslatok'}
          icon={canShowComments ? <Image src={CloseIcon} width="20px" /> : <Image src={CommentIcon} width="20px" />}
          onClick={toggleComments}
        />
        <Box justify="center" align="start" pad="none">
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
    </Box>
  );
};
