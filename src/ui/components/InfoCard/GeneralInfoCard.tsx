import { Box, Heading, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

interface GeneralInfoCardProps {
  title: string;
  subtitle?: string | null;
  content: string;
  isLoading?: boolean;
}

export const GeneralInfoCard: FunctionComponent<GeneralInfoCardProps> = ({ title, subtitle, content }) => {
  return (
    <Box pad="medium" background="white" round="small" elevation="medium" width="large">
      <Heading color="primary" level="3" margin="xsmall" style={{ textTransform: 'uppercase' }}>
        {title}
      </Heading>
      {subtitle && (
        <Heading color="gray" level="4" margin="xsmall">
          {subtitle}
        </Heading>
      )}
      <Paragraph margin={{ horizontal: 'xsmall', vertical: 'small' }}>{content}</Paragraph>
    </Box>
  );
};
