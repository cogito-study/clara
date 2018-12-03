import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Heading, Paragraph } from 'grommet';

interface Props {
  number: number;
  title: string;
  abstract: string;
  date?: string;
}

const NoteCard: FunctionComponent<BoxProps & Props> = (props) => (
  <Box width="medium" pad="none" background="primary" round="small" {...props} elevation="small">
    <Box align="end">
      <Heading
        level={'2'}
        margin={{
          top: 'none',
          bottom: 'none',
          horizontal: 'none',
          vertical: 'none',
          left: 'none',
          right: 'medium',
        }}
      >
        {props.number}
      </Heading>
    </Box>
    <Box background="light" round={{ corner: 'bottom', size: 'small' }} pad="xsmall">
      <Heading level="3" margin="small">
        {props.title}
      </Heading>
      <Paragraph margin="small">{props.abstract}</Paragraph>
      {props.date && <Paragraph margin="small">{props.date}</Paragraph>}
    </Box>
  </Box>
);

export { NoteCard };
