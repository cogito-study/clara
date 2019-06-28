import { Box } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../contexts/user/user-context';
import { useDocumentTitle } from '../../hooks/use-document-title';
import { authService } from '../../services/auth-service';
import { SubjectRouteParams } from '../../types/route-params';
import { SubjectHeader } from '../../ui/components/subject-header/subject-header';
import { SubjectHeaderPlaceholder } from '../../ui/components/subject-header/subject-header-placeholder';
import { SUBJECT_HEADER_QUERY } from './subject-header-query';
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
