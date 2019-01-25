import { Box, BoxProps, Heading, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

import { TeacherInfo, TeacherInfoProps } from './TeacherInfo';

interface Props {
  institute: string;
  neptun: string;
  description: string;
  teacherInfos?: TeacherInfoProps[];
}

export const InfoCardTop: FunctionComponent<BoxProps & Props> = ({ institute, neptun, description, teacherInfos }) => (
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
    <Box wrap direction="row-responsive" align="stretch" justify="between">
      {teacherInfos &&
        teacherInfos.map((teacherInfoProps) => <TeacherInfo key={teacherInfoProps.email} {...teacherInfoProps} />)}
    </Box>
  </Box>
);
