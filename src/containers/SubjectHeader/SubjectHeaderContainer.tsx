import { Box } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { UserContext } from '../../contexts/user/UserContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { authService } from '../../services/authService';
import { SubjectRouteParams } from '../../types/RouteParams';
import { SubjectHeader } from '../../ui/components/SubjectHeader';
import { SubjectHeaderQuery, SubjectHeaderQueryVariables } from './__generated__/SubjectHeaderQuery';
import { SUBJECT_HEADER_QUERY } from './SubjectHeaderQuery';

export const SubjectHeaderContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => {
  const { subjectCode } = props.match.params;
  const client = useApolloClient();
  const loggedInUser = useContext(UserContext);
  const { data } = useQuery<SubjectHeaderQuery, SubjectHeaderQueryVariables>(SUBJECT_HEADER_QUERY, {
    variables: { subjectCode },
  });

  useDocumentTitle(data && data.subject ? data.subject.name : '');

  const onLogout = () => authService.logout(props.history, client);

  const renderHeader = ({ subject }: SubjectHeaderQuery) => {
    if (subject && loggedInUser) {
      const { firstName, lastName } = loggedInUser;
      return <SubjectHeader title={subject.name} userName={`${lastName} ${firstName}`} onLogout={onLogout} />;
    }

    return undefined;
  };

  return (
    <Box fill="horizontal" background="horizontalGradient" align="center" justify="center">
      {data && renderHeader(data)}
    </Box>
  );
};
