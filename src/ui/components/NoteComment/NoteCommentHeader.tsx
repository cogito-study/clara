import { Box, Heading, Text } from 'grommet';
import React, { FunctionComponent } from 'react';

export interface NoteCommentHeaderProps {
  author: string;
  date?: string;
}

export const NoteCommentHeader: FunctionComponent<NoteCommentHeaderProps> = ({ author, date }) => (
  <Box direction="column" align="start" justify="start">
    <Heading level="3" margin="none">
      {author}
    </Heading>
    {date && (
      <Text color="gray" size="xsmall" margin="none">
        {date}
      </Text>
    )}
  </Box>
);
