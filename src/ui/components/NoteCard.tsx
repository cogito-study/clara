import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Heading, Paragraph } from 'grommet';
interface Props {
  noteNumber: number;
  title: string;
  abstract: string;
  dateLabel?: string;
}

const NoteCard: FunctionComponent<BoxProps & Props> = ({
  noteNumber,
  title,
  abstract,
  dateLabel,
  children,
  ...rest
}) => (
  <Box width="280px" height="270px" pad="none" margin="none" round="small" elevation="medium" {...rest}>
    <Box
      height="xxsmall"
      background="primary"
      overflow="hidden"
      justify="center"
      align="end"
      round={{ corner: 'top', size: 'small' }}
      pad={{ horizontal: 'small', vertical: 'none' }}
    >
      <Heading level="4">{noteNumber}</Heading>
    </Box>
    <Box fill justify="between" background="white" round={{ corner: 'bottom', size: 'small' }} pad="medium" gap="small">
      {children}
      <Box fill direction="column" align="start" justify="start" gap="xsmall">
        <Heading level="4" color="dark" margin="none">
          {title}
        </Heading>
        <Paragraph margin="none" size="small" color="grey">
          {abstract.substring(0, 100)}
        </Paragraph>
      </Box>
      {dateLabel && (
        <Paragraph margin="none" size="small" color="lightGrey">
          {dateLabel}
        </Paragraph>
      )}
    </Box>
  </Box>
);

export { NoteCard };
