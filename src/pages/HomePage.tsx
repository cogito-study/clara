import React from 'react';
import { Box } from 'grommet';
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import { SubjectPage } from './SubjectPage';
import { NotePage } from './NotePage';
import { routePath } from '../constants/routePath';

// TODO: Make generic component in the future
const LinkWrapper = styled(Link)`
  text-decoration: none;
  font-size: 0.8em;
  color: #fefefe;
`;

export const HomePage = () => (
  <>
    <Box fill="true" background="primary" flex="true" direction="row" justify="between" align="center" wrap>
      <LinkWrapper to={routePath.root}>Landing Page</LinkWrapper>
      <LinkWrapper to={routePath.subjectInfo}>Subject Info</LinkWrapper>
      <LinkWrapper to={routePath.subjectNotes}>Subject Note List</LinkWrapper>
      <LinkWrapper to={`${routePath.subjectNotes}/12`}>12. Note</LinkWrapper>
      <LinkWrapper to={`${routePath.subjectNotes}/5`}>5. Note</LinkWrapper>
      <LinkWrapper to={`${routePath.register}/123`}>Register 123. UserID</LinkWrapper>
      <LinkWrapper to={`${routePath.register}/15`}>Register 15. UserID</LinkWrapper>
    </Box>
    <Switch>
      <Route exact path={routePath.subjectNotesWithParams} component={NotePage} />
      <Route path={routePath.subject} component={SubjectPage} />
    </Switch>
  </>
);
