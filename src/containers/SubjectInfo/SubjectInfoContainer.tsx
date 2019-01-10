import { Box } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NotificationContext } from '../../contexts/notification/NotificationContext';
import { SubjectRouteParams } from '../../types/RouteParams';
import { InfoCard } from '../../ui/components';
import {
  SubjectInfoQuery,
  SubjectInfoQuery_subject,
  SubjectInfoQueryVariables,
} from './__generated__/SubjectInfoQuery';
import { SUBJECT_INFO_QUERY } from './SubjectInfoQuery';

export const SubjectInfoContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;
  const { showNotification } = useContext(NotificationContext);
  const { data, errors } = useQuery<SubjectInfoQuery, SubjectInfoQueryVariables>(SUBJECT_INFO_QUERY, {
    variables: { subjectCode },
  });

  const renderInfos = ({ info }: SubjectInfoQuery_subject) =>
    info
      ? info.map(({ id, title, subtitle, text }) => (
          <InfoCard key={id} title={title} subtitle={subtitle} content={text} />
        ))
      : undefined;

  return (
    <Box background="light" fill="vertical" align="center" gap="medium" pad="medium" margin="medium">
      {errors && showNotification(errors[0].message, 'error')}
      {data && data.subject && renderInfos(data.subject)}
    </Box>
  );
};
