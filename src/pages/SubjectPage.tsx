import React from 'react';
import { Box } from 'grommet';
import { Route, Switch } from 'react-router-dom';

import { SubjectInfoPage } from './SubjectInfoPage';
import { SubjectNoteListPage } from './SubjectNoteListPage';
import { routePath } from '../constants/routePath';

// TODO: Change background color
// TODO: Insert navigation header here
export const SubjectPage = () => (
  <Box background="lightGrey" flex="true" align="center">
    <Switch>
      <Route exact path={routePath.subjectInfo} component={SubjectInfoPage} />
      <Route exact path={routePath.subjectNotes} component={SubjectNoteListPage} />
    </Switch>
  </Box>
);
