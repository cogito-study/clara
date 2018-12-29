import React, { FunctionComponent, useState, Suspense, useRef } from 'react';
import gql from 'graphql-tag';
import { Box, Button } from 'grommet';
import { useQuery, useMutation, FetchResult } from 'react-apollo-hooks';
import { DataProxy } from 'apollo-cache';
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

const updateNoteCache = (cache: DataProxy, mutationResult: FetchResult<any>) => {
  const { commentNote } = mutationResult.data;
  const queryType = cache.readQuery<{ note: any }>({
    query: NOTE_QUERY,
    variables: { noteID: commentNote.note.id },
  });

  if (queryType) {
    const { note } = queryType;
    cache.writeQuery({
      query: NOTE_QUERY,
      variables: { noteID: commentNote.note.id },
      data: { note: { ...note, comments: commentNote.note.comments } },
    });
  }
};

const mapCommentToLocations = (comment: any): CommentLocation => ({
  id: comment.id,
  range: JSON.parse(comment.locationInText),
});

export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match }) => {
  const { noteID } = match.params;

  const spacerRef = useRef<HTMLDivElement | null>(null);

  const [selectedCommentID, setSelectedCommentID] = useState<number | undefined>(undefined);
  const [canShowComments, setShowComments] = useState(false);
  const [commentMarginTop, setCommentMarginTop] = useState<number>(-10000);

  const { data: noteQueryData } = useQuery(NOTE_QUERY, { variables: { noteID } });
  const submitComment = useMutation(SUBMIT_COMMENT_MUTATION, { update: updateNoteCache });

  useDocumentTitle(noteQueryData.note.title);

  const calculateRelativeMarginTop = (): number =>
    commentMarginTop - (spacerRef.current ? spacerRef.current.offsetTop : 0);

  const onCreateComment = (locationInText: string) => {
    const commentText = prompt('Komment szovege?');

    if (commentText) {
      submitComment({ variables: { noteID, commentData: { text: commentText, locationInText } } });
    }
  };

  const onCommentClick = (id: number, marginTop: number) => {
    setSelectedCommentID(id);
    setCommentMarginTop(marginTop);
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
      <Button primary onClick={() => setShowComments(!canShowComments)}>
        Toggle Comments
      </Button>

      {noteQueryData && noteQueryData.note && renderEditor(noteQueryData.note)}

      <Box justify="center" align="center" pad="none" basis="1/3">
        <div ref={spacerRef}>
          <Suspense fallback={renderCommentLoading()}>
            <NoteCommentContainer marginTop={calculateRelativeMarginTop()} selectedCommentID={selectedCommentID} />
          </Suspense>
        </div>
      </Box>
    </Box>
  );
};
