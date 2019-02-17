import { Box } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NotificationContext } from '../../contexts/notification/NotificationContext';
import { SubjectRouteParams } from '../../types/RouteParams';
import { InfoCard, InfoCardTop } from '../../ui/components';
import {
  SubjectInfoQuery,
  SubjectInfoQuery_subject,
  SubjectInfoQueryVariables,
} from './__generated__/SubjectInfoQuery';
import { SUBJECT_INFO_QUERY } from './SubjectInfoQuery';
import {
  SubjectInfoTopQuery,
  SubjectInfoTopQuery_subject,
  SubjectInfoTopQueryVariables,
} from './__generated__/SubjectInfoTopQuery';
import { SUBJECT_INFO_TOP_QUERY } from './SubjectInfoTopQuery';

// tslint:disable:cyclomatic-complexity

export const SubjectInfoContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;
  const { showNotification } = useContext(NotificationContext);
  const { data: infoData, errors: infoError } = useQuery<SubjectInfoQuery, SubjectInfoQueryVariables>(
    SUBJECT_INFO_QUERY,
    {
      variables: { subjectCode },
    },
  );
  const { data: infoTopData, errors: infoTopError } = useQuery<SubjectInfoTopQuery, SubjectInfoTopQueryVariables>(
    SUBJECT_INFO_TOP_QUERY,
    {
      variables: { subjectCode },
    },
  );

  const renderInfoTop = ({ description, faculty, institute }: SubjectInfoTopQuery_subject) => {
    console.log(faculty);
    const teacherInfos = faculty
      ? faculty.map(({ firstName, lastName, role, phone, email }) => ({
          name: `${firstName!} ${lastName!}`,
          role: role,
          phone: phone!,
          email: email,
        }))
      : [];
    console.log(teacherInfos);
    return (
      <InfoCardTop
        institute={institute!.name}
        neptun={subjectCode}
        description={description}
        teacherInfos={teacherInfos}
      />
    );
  };

  const renderInfos = ({ info }: SubjectInfoQuery_subject) =>
    info
      ? info.map(({ id, title, subtitle, text }) => (
          <InfoCard key={id} title={title} subtitle={subtitle} content={text} />
        ))
      : undefined;

  return (
    <Box background="light" fill="vertical" align="center" gap="medium" pad="medium" margin="medium">
      {infoTopError && showNotification(infoTopError[0].message, 'error')}
      {infoError && showNotification(infoError[0].message, 'error')}

      {infoTopData && infoTopData.subject && renderInfoTop(infoTopData.subject)}
      {infoData && infoData.subject && renderInfos(infoData.subject)}
    </Box>
  );
};
