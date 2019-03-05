import { Box } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../contexts/user/UserContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { authService } from '../../services/authService';
import { SubjectRouteParams } from '../../types/RouteParams';
import { SubjectHeader } from '../../ui/components/SubjectHeader/SubjectHeader';
import { SubjectHeaderPlaceholder } from '../../ui/components/SubjectHeader/SubjectHeaderPlaceholder';
import { SUBJECT_HEADER_QUERY } from './SubjectHeaderQuery';
import { SubjectHeaderQuery, SubjectHeaderQueryVariables } from './__generated__/SubjectHeaderQuery';

export const SubjectHeaderContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => {
  const { subjectCode } = props.match.params;
  const client = useApolloClient();
  const loggedInUser = useContext(UserContext);
  const { data, loading } = useQuery<SubjectHeaderQuery, SubjectHeaderQueryVariables>(SUBJECT_HEADER_QUERY, {
    variables: { subjectCode },
  });

  useDocumentTitle(data && data.subject ? data.subject.name : '');

  const onLogout = () => authService.logout(props.history, client);

  const renderHeader = ({ subject }: SubjectHeaderQuery) => {
    if (subject && loggedInUser) {
      return <SubjectHeader title={subject.name} userName={loggedInUser.fullName} onLogout={onLogout} />;
    }

    return undefined;
  };

  return (
    <Box fill="horizontal" background="horizontalGradient" align="center" justify="center">
      {loading && <SubjectHeaderPlaceholder />}
      {data && renderHeader(data)}
    </Box>
  );
};
