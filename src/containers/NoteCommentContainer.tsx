import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import React, { FunctionComponent, useContext, useState } from 'react';
import { FetchResult, useMutation, useQuery } from 'react-apollo-hooks';

import { UserContext } from '../contexts/UserContext';
import { dateService } from '../services/dateService';
import { NoteComment } from '../ui/components';

const COMMENT_QUERY = gql`
  query CommentQuery($commentID: Int!) {
    comment(commentId: $commentID) {
      text
      createdAt
      author {
        id
        firstName
        lastName
      }
      upvotes {
        id
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

const UNVOTE_COMMENT_MUTATION = gql`
  mutation UnvoteComment($commentID: Int!) {
    unvoteComment(commentId: $commentID) {
      comment {
        id
        upvotes {
          id
        }
      }
    }
  }
`;

const updateCommentCache = (cache: DataProxy, mutationResult: FetchResult<any>) => {
  const newComment = mutationResult.data.upvoteComment
    ? mutationResult.data.upvoteComment
    : mutationResult.data.unvoteComment;

  const queryType = cache.readQuery<{ comment: any }>({
    query: COMMENT_QUERY,
    variables: { commentID: newComment.comment.id },
  });

  if (queryType) {
    const { comment } = queryType;
    cache.writeQuery({
      query: COMMENT_QUERY,
      variables: { commentID: newComment.comment.id },
      data: { comment: { ...comment, upvotes: newComment.comment.upvotes } },
    });
  }
};

export interface Props {
  marginTop: number;
  canShowComments: boolean;
  shouldDisplayNewComment: boolean;
  selectedCommentID?: number;
  onCommentDelete: () => void;
  onNewCommentCancel: () => void;
  onNewCommentDone: (text: string) => void;
}

export const NoteCommentContainer: FunctionComponent<Props> = ({
  marginTop,
  canShowComments,
  selectedCommentID,
  shouldDisplayNewComment,
  onCommentDelete,
  onNewCommentCancel,
  onNewCommentDone,
}) => {
  const loggedInUser = useContext(UserContext);
  const [newCommentText, setNewCommentText] = useState('');
  const { data: commentQueryData } = useQuery(COMMENT_QUERY, { variables: { commentID: selectedCommentID } });

  const upvoteComment = useMutation(UPVOTE_COMMENT_MUTATION, {
    update: updateCommentCache,
    variables: { commentID: selectedCommentID },
  });
  const unvoteComment = useMutation(UNVOTE_COMMENT_MUTATION, {
    update: updateCommentCache,
    variables: { commentID: selectedCommentID },
  });

  const onCommentVote = (isUpvoted: boolean) => (isUpvoted ? unvoteComment() : upvoteComment());

  const renderCommentBox = (comment: any) => {
    const { author, createdAt, upvotes, text } = comment;
    const loggedInUserID = loggedInUser ? loggedInUser.id : undefined;

    const isUpvoted = upvotes.some((upvote) => upvote.id === loggedInUserID);
    const isMyComment = author.id === loggedInUserID;

    return (
      <NoteComment
        author={`${author.lastName} ${author.firstName}`}
        date={dateService.sinceNow(createdAt)}
        paragraph={text}
        upvoteCounts={upvotes.length}
        isUpvoted={isUpvoted}
        onVote={() => onCommentVote(isUpvoted)}
        onDelete={isMyComment ? () => onCommentDelete() : undefined}
      />
    );
  };

  const renderNewCommentBox = () => {
    const author = loggedInUser ? `${loggedInUser.lastName} ${loggedInUser.firstName}` : '';
    return (
      <NoteComment
        author={author}
        onNewCommentChange={setNewCommentText}
        onNewCommentCancel={onNewCommentCancel}
        onNewCommentDone={() => onNewCommentDone(newCommentText)}
      />
    );
  };

  return (
    <Box margin={{ top: `${marginTop}px` }} animation="slideLeft">
      {shouldDisplayNewComment && renderNewCommentBox()}
      {commentQueryData &&
        commentQueryData.comment &&
        canShowComments &&
        selectedCommentID &&
        renderCommentBox(commentQueryData.comment)}
    </Box>
  );
};
