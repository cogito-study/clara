import React, { FunctionComponent, useContext } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { InfoCard, NotificationType } from '../ui/components';
import { SubjectRouteParams } from '../types/RouteParams';
import { NotificationContext } from '../contexts/NotificationContext';

const SUBJECT_INFO_QUERY = gql`
  query SubjectInfo($subjectCode: String!) {
    subject(subjectCode: $subjectCode) {
      subjectInfo {
        infoItems {
          title
          subtitle
          text
        }
      }
    }
  }
`;

export const SubjectInfoContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;
  const showNotification = useContext(NotificationContext);
  const { data, errors } = useQuery(SUBJECT_INFO_QUERY, { variables: { subjectCode } });

  console.log('errors', errors);

  const renderInfos = () =>
    data.subject.subjectInfo.infoItems.map((infoItem, index) => (
      <InfoCard key={index} title={infoItem.title} subtitle={infoItem.subtitle} content={infoItem.text} />
    ));

  return (
    <Box background="light" fill="vertical" align="center" gap="medium" pad="medium">
      {errors && showNotification(errors[0].message, NotificationType.Error)}
      {data && data.subjectInfo && renderInfos()}
    </Box>
  );
};
