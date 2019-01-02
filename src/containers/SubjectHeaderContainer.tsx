import gql from 'graphql-tag';
import { Box } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { authService } from '../services/authService';
import { SubjectRouteParams } from '../types/RouteParams';
import { SubjectHeader } from '../ui/components/SubjectHeader';

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
  const client = useApolloClient();

  const loggedInUser = useContext(UserContext);
  const userID = loggedInUser ? loggedInUser.id : undefined;
  const { data: queryData } = useQuery(SUBJECT_HEADER_QUERY, { variables: { userID, subjectCode } });

  useDocumentTitle(queryData.subject.subjectInfo.name);

  const onLogout = () => authService.logout(props.history, client);

  const renderHeader = (data: any) => {
    if (data.subject && data.user) {
      const {
        user: { lastName, firstName },
        subject: { subjectInfo },
      } = data;
      return <SubjectHeader title={subjectInfo.name} userName={`${lastName} ${firstName}`} onLogout={onLogout} />;
    }

    return undefined;
  };

  return (
    <Box fill="horizontal" background="horizontalGradient" align="center" justify="center">
      {queryData && renderHeader(queryData)}
    </Box>
  );
};
