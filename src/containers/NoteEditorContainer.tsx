import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery, useMutation, FetchResult } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NoteRouteParams } from '../types/RouteParams';
import Editor, { CommentLocation } from '../editor/Editor';
import { NoteCommentBox } from '../ui/components';
import { DataProxy } from 'apollo-cache';
import { dateService } from '../services/dateService';

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

const COMMENT_QUERY = gql`
  query CommentQuery($commentID: Int!) {
    comment(commentId: $commentID) {
      text
      createdAt
      author {
        firstName
        lastName
      }
      upvotes {
        username
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

const updateCache = (cache: DataProxy, mutationResult: FetchResult<any>) => {
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
  const [locationInText, setLocationInText] = useState('');
  const [selectedCommentID, setSelectedCommentID] = useState<number | undefined>(2);
  const [commentMarginTop, setCommentMarginTop] = useState<number>(-10000);
  const [commentText, setCommentText] = useState('New Comment');

  const { data: noteQueryData } = useQuery(NOTE_QUERY, { variables: { noteID } });
  const { data: commentQueryData } = useQuery(COMMENT_QUERY, { variables: { commentID: selectedCommentID } });
  const submitComment = useMutation(SUBMIT_COMMENT_MUTATION, {
    update: updateCache,
    variables: { noteID, commentData: { text: commentText, locationInText } },
  });

  const onCreateComment = (location: string) => {
    setLocationInText(location);
    setCommentText('User entered a comment here'); // TODO: Create modal for comment input
    submitComment().then(console.log);
  };

  const onCommentClick = (id: number, marginTop: number) => {
    setSelectedCommentID(id);
    console.log('marginTop', marginTop);
    setCommentMarginTop(marginTop);
  };

  const onCommentUpvote = () => console.log('Upvoted comment');

  const renderEditor = (data: any) => {
    const { title, text, comments } = data.note;
    return (
      <Box basis="2/3">
        <Editor
          title={title}
          initialValue={JSON.parse(text)}
          commentLocations={comments.map(mapCommentToLocations)}
          onCreateComment={onCreateComment}
          onCommentClick={onCommentClick}
        />
      </Box>
    );
  };

  const renderCommentBox = (data: any) => {
    console.log(data.comment);
    const { author, createdAt, upvotes, text } = data.comment;
    return (
      <Box basis="1/3">
        <NoteCommentBox
          marginTop={commentMarginTop}
          author={`${author.lastName} ${author.firstName}`}
          date={dateService.yearMonthDay(createdAt)} // TODO: Implement datservice "xy minutes ago" function
          paragraph={text}
          upvoteCounts={upvotes.length}
          onUpvote={onCommentUpvote}
        />
      </Box>
    );
  };

  return (
    <Box fill justify="start" align="start" pad="small" direction="row">
      {noteQueryData && renderEditor(noteQueryData)}
      {commentQueryData && renderCommentBox(commentQueryData)}
    </Box>
  );
};
