import { Box, Button, Heading, Image, Text } from 'grommet';
import React, { FunctionComponent, Fragment } from 'react';

import upvote from '../../assets/images/Upvote.svg';
import trash from '../../assets/images/Trash.svg';
import upvoted from '../../assets/images/Upvoted.svg';

export interface Props {
  author: string;
  date: string;
  paragraph: string;
  upvoteCounts: number;
  isUpvoted: boolean;
  onVote: (isUpvoted: boolean) => void;
  onDelete?: () => void;
}

export const NoteComment: FunctionComponent<Props> = ({
  author,
  date,
  paragraph,
  upvoteCounts,
  isUpvoted,
  onVote,
  onDelete,
}) => {
  return (
    <Box width="320px" background="white" direction="column" round="20px" overflow="hidden" elevation="medium">
      <Box direction="column" align="start" justify="between" margin="medium" gap="small">
        <Fragment>
          <Heading level="3" margin="none">
            {author}
          </Heading>
          <Text color="gray" size="xsmall" margin="none">
            {date}
          </Text>
        </Fragment>
        <Text size="small">{paragraph}</Text>
      </Box>
      <Box justify="end" direction="row" pad="small" gap="small">
        {onDelete && (
          <Button reverse color="error" label="Törlés" onClick={onDelete} icon={<Image src={trash} width="16px" />} />
        )}
        <Button
          reverse
          active={isUpvoted}
          color="primary"
          icon={<Image src={isUpvoted ? upvoted : upvote} width="16px" />}
          label={upvoteCounts}
          onClick={() => onVote(isUpvoted)}
        />
      </Box>
    </Box>
  );
};
