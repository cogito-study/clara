import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery, useMutation, FetchResult } from 'react-apollo-hooks';
import { DataProxy } from 'apollo-cache';
import { RouteComponentProps } from 'react-router-dom';

import { NoteRouteParams } from '../types/RouteParams';
import Editor, { CommentLocation } from '../editor/Editor';
import { NoteCommentBox } from '../ui/components';
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
        id
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

const UPVOTE_COMMENT_MUTATION = gql`
  mutation UpvoteComment($commentID: Int!) {
    upvoteComment(commentId: $commentID) {
      comment {
        id
        upvotes {
          id
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

const updateCommentCache = (cache: DataProxy, mutationResult: FetchResult<any>) => {
  const { upvoteComment } = mutationResult.data;
  const queryType = cache.readQuery<{ comment: any }>({
    query: COMMENT_QUERY,
    variables: { commentID: upvoteComment.comment.id },
  });
  if (queryType) {
    const { comment } = queryType;
    cache.writeQuery({
      query: COMMENT_QUERY,
      variables: { commentID: upvoteComment.comment.id },
      data: { comment: { ...comment, upvotes: upvoteComment.comment.upvotes } },
    });
  }
};

const mapCommentToLocations = (comment: any): CommentLocation => ({
  id: comment.id,
  range: JSON.parse(comment.locationInText),
});

export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match }) => {
  const { noteID } = match.params;
  const [selectedCommentID, setSelectedCommentID] = useState<number | undefined>(2);
  const [commentMarginTop, setCommentMarginTop] = useState<number>(-10000);

  const { data: noteQueryData } = useQuery(NOTE_QUERY, { variables: { noteID } });
  const { data: commentQueryData } = useQuery(COMMENT_QUERY, { variables: { commentID: selectedCommentID } });

  const submitComment = useMutation(SUBMIT_COMMENT_MUTATION, { update: updateNoteCache });
  const upvoteComment = useMutation(UPVOTE_COMMENT_MUTATION, { update: updateCommentCache });

  const onCreateComment = (locationInText: string) => {
    const commentText = 'User entered a comment here';
    submitComment({ variables: { noteID, commentData: { text: commentText, locationInText } } });
  };

  const onCommentClick = (id: number, marginTop: number) => {
    setSelectedCommentID(id);
    setCommentMarginTop(marginTop);
  };

  const onCommentUpvote = () => {
    upvoteComment({ variables: { commentID: selectedCommentID } });
  };

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
