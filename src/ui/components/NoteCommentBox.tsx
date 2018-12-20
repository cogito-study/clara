import React, { FunctionComponent } from 'react';
import { Box, Button, Heading, Paragraph } from 'grommet';
import { Like } from 'grommet-icons';

interface Props {
  author: string;
  date: string;
  paragraph: string;
  upvoteCounts: number;
  onUpvote: () => void;
}

export const NoteCommentBox: FunctionComponent<Props> = ({ author, date, paragraph, upvoteCounts, onUpvote }) => {
  return (
    <Box width="medium" direction="row" round="small" overflow="hidden" elevation="medium">
      <Box background="primary" width="12px" />
      <Box fill background="red">
        <Box fill background="yellow">
          <Box fill background="light" pad="none">
            <Heading level="3" margin={{ top: 'medium', bottom: 'xsmall', horizontal: 'medium' }}>
              {author}
            </Heading>
            <Heading level="4" margin={{ horizontal: 'medium', vertical: 'xsmall' }}>
              {date}
            </Heading>
            <Paragraph margin="medium">{paragraph}</Paragraph>
          </Box>
        </Box>
        <Box
          height="42px"
          background="light"
          align="end"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          border={{ color: 'lightGray', side: 'top', size: 'xsmall' }}
        >
          <Button
            plain
            reverse
            label={upvoteCounts}
            icon={<Like size="medium" color="lightGrey" />}
            onClick={onUpvote}
          />
        </Box>
      </Box>
    </Box>
  );
};
