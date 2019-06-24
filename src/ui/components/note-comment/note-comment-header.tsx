import { Box, Heading, Text } from 'grommet';
import React, { FunctionComponent } from 'react';

export interface NoteCommentHeaderProps {
  authorName: string;
  date?: string;
}

export const NoteCommentHeader: FunctionComponent<NoteCommentHeaderProps> = ({ authorName, date }) => {
  return (
    <Box direction="column" align="start" justify="start">
      <Heading level="4" margin="none">
        {authorName}
      </Heading>
      {date && (
        <Text color="gray" size="xsmall" margin="none">
          {date}
        </Text>
      )}
    </Box>
  );
};
