import { Tab, Tabs } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { routePath } from '../constants';
import { SubjectRouteParams } from '../types/RouteParams';
import { SubjectInfoContainer } from './SubjectInfoContainer';
import { SubjectNoteListContainer } from './SubjectNoteListContainer';

export const SubjectTabsContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({
  history,
  location,
  match,
}) => {
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
