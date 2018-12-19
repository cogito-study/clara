import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { InfoCard } from '../ui/components';

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

export const SubjectInfoContainer: FunctionComponent<RouteComponentProps<{ subjectCode: string }>> = ({ match }) => {
  const { subjectCode } = match.params;
  const { data, errors } = useQuery(SUBJECT_INFO_QUERY, { variables: { subjectCode } });

  const renderError = () => <div>Error</div>; // TODO: proper error handling

  const renderInfos = () =>
    data.subject.subjectInfo.infoItems.map((infoItem, index) => (
      <InfoCard key={index} title={infoItem.title} subtitle={infoItem.subtitle} content={infoItem.text} />
    ));

  return (
    <Box background="light" fill="vertical" align="center" gap="medium" pad="medium">
      {errors && renderError()}
      {data && renderInfos()}
    </Box>
  );
};
