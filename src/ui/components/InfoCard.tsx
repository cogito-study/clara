import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Heading, Paragraph } from 'grommet';
import styled from 'styled-components';

interface Props {
  title: string;
  subtitle?: string;
  content: string;
}

const UpperCaseHeading = styled(Heading)`
  text-transform: uppercase;
`;

export const InfoCard: FunctionComponent<BoxProps & Props> = (props) => (
  <Box pad="medium" background="white" round="xsmall" elevation="small" width="large">
    <UpperCaseHeading level="3" margin="xsmall">
      {props.title}
    </UpperCaseHeading>
    {props.subtitle && (
      <Heading level="4" margin="xsmall">
        {props.subtitle}
      </Heading>
    )}
    <Paragraph>{props.content}</Paragraph>
  </Box>
);
