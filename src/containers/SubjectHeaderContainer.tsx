import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import gql from 'graphql-tag';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import { SubjectHeader } from '../ui/components/SubjectHeader';
import { localStorageKeys, routePath } from '../constants';

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

const HeaderContainer: FunctionComponent<RouteComponentProps<{ subjectCode: string }>> = (props) => {
  const { subjectCode } = props.match.params;
  const userID = localStorage.getItem(localStorageKeys.loggedInUserID);
  const { data } = useQuery(SUBJECT_HEADER_QUERY, { variables: { userID, subjectCode } });
  const {
    user: { lastName, firstName },
    subject: { subjectInfo },
  } = data;

  const onLogout = () => {
    localStorage.removeItem(localStorageKeys.authToken);
    localStorage.removeItem(localStorageKeys.loggedInUserID);
    props.history.push(routePath.root());
  };

  return (
    <Box fill="horizontal" background="gradient" align="center" justify="center">
      <SubjectHeader title={subjectInfo.name} userName={`${lastName} ${firstName}`} onLogout={onLogout} />
    </Box>
  );
};

export const SubjectHeaderContainer = withRouter(HeaderContainer);
