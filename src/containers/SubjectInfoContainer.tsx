import gql from 'graphql-tag';
import { Box } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NotificationContext } from '../contexts/NotificationContext';
import { SubjectRouteParams } from '../types/RouteParams';
import { InfoCard } from '../ui/components';

const SUBJECT_INFO_QUERY = gql`
  query SubjectInfo($subjectCode: String!) {
    subject(code: $subjectCode) {
      info {
        id
        title
        subtitle
        text
      }
    }
  }
`;

export const SubjectInfoContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;
  const { showNotification } = useContext(NotificationContext);
  const { data, errors } = useQuery(SUBJECT_INFO_QUERY, { variables: { subjectCode } });

  const renderInfos = () =>
    data.subject.info.map(({ id, title, subtitle, text }) => (
      <InfoCard key={id} title={title} subtitle={subtitle} content={text} />
    ));

  return (
    <Box background="light" fill="vertical" align="center" gap="medium" pad="medium" margin="medium">
      {errors && showNotification(errors[0].message, 'error')}
      {data && data.subject && renderInfos()}
    </Box>
  );
};
