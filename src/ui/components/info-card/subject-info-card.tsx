import { Box, Heading, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';
import { TeacherInfoGrid, TeacherInfoGridProps } from '../teacher-info/teacher-info-grid';

interface SubjectInfoCardProps extends TeacherInfoGridProps {
  institute: string;
  neptun: string;
  description: string;
  isLoading?: boolean;
}

export const SubjectInfoCard: FunctionComponent<SubjectInfoCardProps> = ({
  institute,
  neptun,
  description,
  teacherInfos,
  isLoading,
}) => {
  console.log('isLoading', isLoading);

  return (
    <Box pad="large" background="white" round="small" elevation="medium" width="large">
      <Box direction="row" justify="between" align="baseline">
        <Heading color="primary" level="3" margin="xsmall">
          {institute}
        </Heading>
        <Heading color="gray_light_1" level="4" margin="xsmall" style={{ textTransform: 'uppercase' }}>
          {neptun}
        </Heading>
      </Box>
      <Paragraph color="gray" margin={{ horizontal: 'xsmall', vertical: 'small' }}>
        {description}
      </Paragraph>
      <TeacherInfoGrid teacherInfos={teacherInfos} />
    </Box>
  );
};
