import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useApolloClient } from 'react-apollo-hooks';

import { SubjectHeader } from '../ui/components/SubjectHeader';
import { SubjectRouteParams } from '../types/RouteParams';
import { authService } from '../services/authService';

const SUBJECT_HEADER_QUERY = gql`
  query SubjectHeader($userID: Int!, $subjectCode: String!) {
    user(userId: $userID) {
      lastName
      firstName
    }
    subject(subjectCode: $subjectCode) {
      subjectInfo {
        name
      }
    }
  }
`;

export const SubjectHeaderContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => {
  const { subjectCode } = props.match.params;
  const userID = authService.getUserID();

  const client = useApolloClient();
  const { data } = useQuery(SUBJECT_HEADER_QUERY, { variables: { userID, subjectCode } });
  const {
    user: { lastName, firstName },
    subject: { subjectInfo },
  } = data;

  const onLogout = () => authService.logout(props.history, client);

  return (
    <Box fill="horizontal" background="primary" align="center" justify="center">
      <SubjectHeader title={subjectInfo.name} userName={`${lastName} ${firstName}`} onLogout={onLogout} />
    </Box>
  );
};
