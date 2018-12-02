import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Text } from 'grommet';

interface NoteCardProps {
  title?: string;
  abstract?: string;
  date?: Date;
  likes?: number;
}

const NoteCard: FunctionComponent<BoxProps & NoteCardProps> = (props) => (
  <Box width="medium" pad="none" background="primary" round="small" {...props}>
    <Box
      pad={{
        top: 'medium',
        bottom: 'medium',
        horizontal: 'medium',
        vertical: 'medium',
        left: 'medium',
        right: 'medium',
      }}
      background="lightGrey"
      round="none"
      margin={{ top: 'large', bottom: 'none', horizontal: 'none', vertical: 'none', left: 'none', right: 'none' }}
      wrap={true}
    >
      <Text size="xlarge">{props.title}</Text>
      <Text size="medium">{props.abstract}</Text>
      <Text size="small">{props.date}</Text>
    </Box>
  </Box>
);

export { NoteCard };
