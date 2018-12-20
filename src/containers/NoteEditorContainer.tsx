import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import CogitoEditor, { CommentLocation } from '../editor/Editor';
import { NoteRouteParams } from '../types/RouteParams';

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

export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match }) => {
  const { noteID } = match.params;
  const [locationInText, setLocationInText] = useState('');

  const { data } = useQuery(NOTE_QUERY, { variables: { noteID } });
  const submitComment = useMutation(SUBMIT_COMMENT_MUTATION, {
    update: (cache, { data: { commentNote } }) => {
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
    },
    variables: { noteID, commentData: { text: 'New Comment', locationInText } },
  });

  const mapCommentToLocations = (comment): CommentLocation => ({
    id: comment.id,
    range: JSON.parse(comment.locationInText),
  });

  const onCreateComment = (location: string) => {
    setLocationInText(location);
    submitComment().then(console.log);
  };

  return (
    <Box justify="center" pad="small">
      {data && (
        <CogitoEditor
          title={data.note.title}
          initialValue={JSON.parse(data.note.text)}
          commentLocations={data.note.comments.map(mapCommentToLocations)}
          onCreateComment={onCreateComment}
          onCommentClick={(id: number, margintTop: number) => console.log('commentID', id, 'margintTop', margintTop)}
        />
      )}
    </Box>
  );
};
