import { Box, BoxProps, Heading, Paragraph, Stack } from 'grommet';
import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

interface Props {
  noteNumber: number;
  title: string;
  abstract: string;
  dateLabel?: string;
}

const HeadingWithOpacity = styled(Heading)`
  opacity: 0.2;
  font-size: 80px;
`;

const NoteCard: FunctionComponent<BoxProps & Props> = ({
  noteNumber,
  title,
  abstract,
  dateLabel,
  children,
  ...rest
}) => (
  <Box>
    <Box
      align="center"
      width="280px"
      height="270px"
      justify="between"
      background="white"
      round="medium"
      pad="medium"
      gap="small"
      elevation="large"
      {...rest}
    >
      {children}

      <Box fill direction="column" align="start" justify="start" gap="xsmall">
        <Box fill="horizontal">
          <Stack anchor="top-right" margin={{ top: '12px', horizontal: 'none' }} guidingChild="last">
            <HeadingWithOpacity margin="none" color="primary" level="1">
              {noteNumber < 10 ? '0' + noteNumber : noteNumber}
            </HeadingWithOpacity>
            <Heading level="4" color="dark" margin="none">
              {title}
            </Heading>
          </Stack>
        </Box>
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
