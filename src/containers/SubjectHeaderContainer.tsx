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
  query SubjectHeader($subjectCode: String!) {
    subject(code: $subjectCode) {
      name
    }
  }
`;

export const SubjectHeaderContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => {
  const { subjectCode } = props.match.params;
  const client = useApolloClient();

  const loggedInUser = useContext(UserContext);
  const { data: queryData } = useQuery(SUBJECT_HEADER_QUERY, { variables: { subjectCode } });

  useDocumentTitle(queryData.subject.name);

  const onLogout = () => authService.logout(props.history, client);

  const renderHeader = (data: any) => {
    if (data.subject && loggedInUser) {
      const { name } = data.subject;
      const { firstName, lastName } = loggedInUser;
      return <SubjectHeader title={name} userName={`${lastName} ${firstName}`} onLogout={onLogout} />;
    }

    return undefined;
  };

  return (
    <Box fill="horizontal" background="horizontalGradient" align="center" justify="center">
      {queryData && renderHeader(queryData)}
    </Box>
  );
};
