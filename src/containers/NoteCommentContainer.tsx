import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { DataProxy } from 'apollo-cache';
import { useQuery, useMutation, FetchResult } from 'react-apollo-hooks';

import { NoteComment } from '../ui/components';
import { dateService } from '../services/dateService';
import { authService } from '../services/authService';

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
  selectedCommentID?: number;
  onCommentDelete: () => void;
}

export const NoteCommentContainer: FunctionComponent<Props> = ({
  marginTop,
  selectedCommentID,
  canShowComments,
  onCommentDelete,
}) => {
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
    const loggedInUserID = authService.getUserID();

    const isUpvoted = upvotes.some((upvote) => upvote.id === loggedInUserID);
    const isMyComment = author.id === loggedInUserID;

    console.log('authorid', author.id, 'loggedInUserID', loggedInUserID);
    console.log('isMyComment', isMyComment);

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

  return (
    <Box margin={{ top: `${marginTop}px` }} animation="slideLeft">
      {commentQueryData && commentQueryData.comment && canShowComments && renderCommentBox(commentQueryData.comment)}
    </Box>
  );
};
