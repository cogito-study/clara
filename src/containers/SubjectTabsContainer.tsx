import React, { FunctionComponent } from 'react';
import { Tabs, Tab } from 'grommet';
import { RouteComponentProps, withRouter, Route } from 'react-router-dom';

import { routePath } from '../constants';
import { SubjectInfoContainer } from './SubjectInfoContainer';
import { SubjectNoteListContainer } from './SubjectNoteListContainer';

const SubjectTabs: FunctionComponent<RouteComponentProps<{ subjectCode: string }>> = ({ history, location, match }) => {
  const { subjectCode } = match.params;
  const tabRoutes = [routePath.subjectNoteList(subjectCode), routePath.subjectInfo(subjectCode)];

  const onActiveTab = (index: number) => history.push(tabRoutes[index]);

  const findActiveIndex = (): number => tabRoutes.findIndex((tabRoute) => tabRoute === location.pathname);

  return (
    <Tabs flex justify="center" onActive={onActiveTab} activeIndex={findActiveIndex()}>
      <Tab title="Jegyzetek">
        <Route exact path={routePath.subjectNoteList()} component={SubjectNoteListContainer} />
      </Tab>
      <Tab title="Tárgy info">
        <Route exact path={routePath.subjectInfo()} component={SubjectInfoContainer} />
      </Tab>
    </Tabs>
  );
};

export const SubjectTabsContainer = withRouter(SubjectTabs);
