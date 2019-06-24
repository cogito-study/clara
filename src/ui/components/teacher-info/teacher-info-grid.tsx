import { Grid } from 'grommet';
import React, { Fragment, FunctionComponent } from 'react';

import { TeacherInfo, TeacherInfoProps } from './teacher-info';
import { TeacherInfoPlaceholder } from './teacher-info-placeholder';

export interface TeacherInfoGridProps {
  teacherInfos?: TeacherInfoProps[];
  isLoading?: boolean;
}

export const TeacherInfoGrid: FunctionComponent<TeacherInfoGridProps> = ({ teacherInfos, isLoading }) => (
  <Grid justify="center" columns={{ count: 'fill', size: '280px' }} margin={{ top: 'small' }}>
    {isLoading ? (
      <Fragment>
        <TeacherInfoPlaceholder />
        <TeacherInfoPlaceholder />
      </Fragment>
    ) : (
      teacherInfos &&
      teacherInfos.map((teacherInfoProps) => <TeacherInfo key={teacherInfoProps.email} {...teacherInfoProps} />)
    )}
  </Grid>
);
