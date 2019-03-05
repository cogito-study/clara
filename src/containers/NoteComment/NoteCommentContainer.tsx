import { Box } from 'grommet';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { UserContext } from '../../contexts/user/UserContext';
import { dateService } from '../../services/dateService';
import { NoteComment } from '../../ui/components';
import { NoteCommentPlaceholder } from '../../ui/components/NoteComment/NoteCommentPlaceholder';
import { COMMENT_QUERY } from './CommentQuery';
import { UNVOTE_COMMENT_MUTATION } from './UnvoteCommentMutation';
import { UPVOTE_COMMENT_MUTATION } from './UpvoteCommentMutation';
import { CommentQuery, CommentQueryVariables, CommentQuery_comment } from './__generated__/CommentQuery';
import { UnvoteCommentMutation, UnvoteCommentMutationVariables } from './__generated__/UnvoteCommentMutation';
import { UpvoteCommentMutation, UpvoteCommentMutationVariables } from './__generated__/UpvoteCommentMutation';

export interface Props {
  marginTop: number;
  canShowComments: boolean;
  shouldDisplayNewComment: boolean;
  selectedCommentID?: number;
  onCommentDelete: () => void;
  onNewCommentCancel: () => void;
  onNewCommentDone: (text: string) => void;
}

/* eslint-disable complexity */
export const NoteCommentContainer: FunctionComponent<Props> = ({
  marginTop,
  canShowComments,
  selectedCommentID,
  shouldDisplayNewComment,
  onCommentDelete,
  onNewCommentCancel,
  onNewCommentDone,
}) => {
  const commentID = selectedCommentID ? selectedCommentID.toString() : '';
  const loggedInUser = useContext(UserContext);
  const [newCommentText, setNewCommentText] = useState('');
  const { data: commentQueryData, loading: commentLoading } = useQuery<CommentQuery, CommentQueryVariables>(
    COMMENT_QUERY,
    {
      variables: { commentID },
      skip: !commentID,
    },
  );

  const upvoteComment = useMutation<UpvoteCommentMutation, UpvoteCommentMutationVariables>(UPVOTE_COMMENT_MUTATION, {
    refetchQueries: [{ query: COMMENT_QUERY, variables: { commentID } }],
    variables: { commentID },
  });
  const unvoteComment = useMutation<UnvoteCommentMutation, UnvoteCommentMutationVariables>(UNVOTE_COMMENT_MUTATION, {
    refetchQueries: [{ query: COMMENT_QUERY, variables: { commentID } }],
    variables: { commentID },
  });

  const onCommentVote = (isUpvoted: boolean) => (isUpvoted ? unvoteComment() : upvoteComment());

  const renderCommentBox = ({ author, createdAt, upvotes, text }: CommentQuery_comment) => {
    const loggedInUserID = loggedInUser ? loggedInUser.id : undefined;

    const isUpvoted = upvotes ? upvotes.some((upvote) => upvote.id === loggedInUserID) : false;
    const isMyComment = author.id === loggedInUserID;

    return (
      <NoteComment
        authorName={`${author.lastName} ${author.firstName}`}
        date={dateService.sinceNow(createdAt)}
        paragraph={text}
        upvoteCounts={upvotes ? upvotes.length : 0}
        isUpvoted={isUpvoted}
        onVote={() => onCommentVote(isUpvoted)}
        onDelete={isMyComment ? () => onCommentDelete() : undefined}
      />
    );
  };

  const renderNewCommentBox = () => {
    const authorName = loggedInUser ? loggedInUser.fullName : '';
    return (
      <NoteComment
        authorName={authorName}
        onNewCommentChange={setNewCommentText}
        onNewCommentCancel={onNewCommentCancel}
        onNewCommentDone={() => onNewCommentDone(newCommentText)}
      />
    );
  };

  return (
    <Box margin={{ top: `${marginTop}px` }} animation="slideLeft">
      {commentLoading && <NoteCommentPlaceholder />}
      {shouldDisplayNewComment
        ? renderNewCommentBox()
        : commentQueryData &&
          commentQueryData.comment &&
          canShowComments &&
          selectedCommentID &&
          renderCommentBox(commentQueryData.comment)}
    </Box>
  );
};
