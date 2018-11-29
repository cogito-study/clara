import React, { FunctionComponent } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import { SubjectInfoContainer } from '../containers/SubjectInfoContainer';
import { SubjectNoteListContainer } from '../containers/SubjectNoteListContainer';

const SubjectPage: FunctionComponent<RouteComponentProps> = ({ match }) => (
  <Switch>
    <Route exact path={match.path} render={() => <div>You can not be here</div>} />
    <Route exact path={`${match.path}/notes`} component={SubjectNoteListContainer} />
    <Route path={`${match.path}/info`} component={SubjectInfoContainer} />
  </Switch>
);

export default SubjectPage;
