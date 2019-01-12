import { Box, BoxProps, Heading, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

interface Props {
  title: string;
  subtitle?: string | null;
  content: string;
}

export const InfoCard: FunctionComponent<BoxProps & Props> = (props) => (
  <Box pad="medium" background="white" round="small" elevation="medium" width="large">
    <Heading color="primary" level="3" margin="xsmall" style={{ textTransform: 'uppercase' }}>
      {props.title}
    </Heading>
    {props.subtitle && (
      <Heading color="gray" level="4" margin="xsmall">
        {props.subtitle}
      </Heading>
    )}
    <Paragraph margin={{ horizontal: 'xsmall', vertical: 'small' }}>{props.content}</Paragraph>
  </Box>
);
