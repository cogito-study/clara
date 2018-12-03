import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Heading, Paragraph } from 'grommet';

interface Props {
  title: string;
  subtitle?: string;
  content: string;
}

const InfoCard: FunctionComponent<BoxProps & Props> = (props) => (
  <Box
    pad={{
      top: 'medium',
      bottom: 'medium',
      horizontal: 'medium',
      vertical: 'medium',
      left: 'medium',
      right: 'medium',
    }}
    background="light"
    round="xsmall"
    elevation="small"
    width="large"
  >
    <Heading level="3" margin="xsmall">
      {props.title}
    </Heading>
    {props.subtitle && (
      <Heading level="4" margin="xsmall">
        {props.subtitle}
      </Heading>
    )}
    <Paragraph margin="xsmall">{props.content}</Paragraph>
  </Box>
);

export { InfoCard };
