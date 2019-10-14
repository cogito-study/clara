import { Box, Button, Heading, Image, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

export interface FeedbackCardProps {
  title: string;
  icon: string;
  paragraph?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export const FeedbackCard: FunctionComponent<FeedbackCardProps> = ({
  title,
  icon,
  paragraph,
  buttonLabel,
  onButtonClick,
}) => (
  <Box
    animation={{ type: 'fadeIn', duration: 500 }}
    background="white"
    elevation="large"
    align="center"
    pad={{ top: 'medium', bottom: 'large' }}
    justify="center"
    round="medium"
  >
    <Heading level="2" margin="medium" color="primary" textAlign="center">
      {title}
    </Heading>
    <Box align="center" margin={{ top: 'large', bottom: 'small' }}>
      <Image src={icon} width="100px" />
    </Box>
    <Paragraph
      textAlign="center"
      size="medium"
      margin={{ horizontal: 'medium', top: 'small', bottom: 'medium' }}
    >
      {paragraph}
    </Paragraph>
    {onButtonClick && <Button primary label={buttonLabel} onClick={onButtonClick} />}
  </Box>
);
