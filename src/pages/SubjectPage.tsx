import React, { FunctionComponent } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Box } from 'grommet';

import { HeaderContainer } from '../containers/HeaderContainer';
import { SubjectInfoContainer } from '../containers/SubjectInfoContainer';
import { SubjectNoteListContainer } from '../containers/SubjectNoteListContainer';

const SubjectPage: FunctionComponent<RouteComponentProps> = ({ match }) => (
  <Box fill>
    <HeaderContainer />
    <Switch>
      <Route exact path={match.path} render={() => <div>You can not be here</div>} />
      <Route exact path={`${match.path}/notes`} component={SubjectNoteListContainer} />
      <Route path={`${match.path}/info`} component={SubjectInfoContainer} />
    </Switch>
  </Box>
);

export default SubjectPage;
