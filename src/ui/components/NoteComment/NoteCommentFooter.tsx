import React, { FunctionComponent, Fragment } from 'react';
import { Box, Button, Image } from 'grommet';

import upvote from '../../../assets/images/Upvote.svg';
import trash from '../../../assets/images/Trash.svg';
import upvoted from '../../../assets/images/Upvoted.svg';

interface ExistingCommentFooterProps {
  upvoteCounts?: number;
  isUpvoted?: boolean;
  onVote?: (isUpvoted: boolean) => void;
  onDelete?: () => void;
}

const ExistingCommentFooter: FunctionComponent<ExistingCommentFooterProps> = ({
  isUpvoted,
  onVote,
  onDelete,
  upvoteCounts,
}) => (
  <Box height="38px" align="stretch" justify="end" direction="row" pad="none" gap="small">
    {onDelete && (
      <Button
        reverse
        plain={false}
        color="error"
        label="Törlés"
        onClick={onDelete}
        icon={<Image src={trash} width="16px" />}
      />
    )}
    {isUpvoted !== undefined && upvoteCounts !== undefined && onVote && (
      <Button
        reverse
        plain={false}
        active={isUpvoted}
        color="primary"
        icon={<Image src={isUpvoted ? upvoted : upvote} width="16px" />}
        label={upvoteCounts === 0 ? true : upvoteCounts} // temporary workaround to handle 0 not a falsy value
        onClick={() => onVote(isUpvoted)}
      />
    )}
  </Box>
);

interface NewCommentFooterProps {
  onNewCommentCancel?: () => void;
  onNewCommentDone?: () => void;
}

const NewCommentFooter: FunctionComponent<NewCommentFooterProps> = ({ onNewCommentCancel, onNewCommentDone }) => (
  <Box justify="end" direction="row" pad="none" gap="small">
    {onNewCommentCancel && <Button reverse color="gray" label="X" onClick={onNewCommentCancel} />}
    {onNewCommentDone && <Button color="primary" label="Kész" onClick={onNewCommentDone} />}
  </Box>
);

export type NoteCommentFooterProps = ExistingCommentFooterProps & NewCommentFooterProps;

export const NoteCommentFooter: FunctionComponent<NoteCommentFooterProps> = ({
  onNewCommentCancel,
  onNewCommentDone,
  ...rest
}) => (
  <Fragment>
    <NewCommentFooter onNewCommentCancel={onNewCommentCancel} onNewCommentDone={onNewCommentDone} />
    <ExistingCommentFooter {...rest} />
  </Fragment>
);
