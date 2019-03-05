import { Box, Tab, Tabs } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { routeBuilder } from '../../route/routeBuilder';
import { SubjectRouteParams } from '../../types/RouteParams';
import { SubjectInfoContainer } from '../SubjectInfo/SubjectInfoContainer';
import { SubjectNoteListContainer } from '../SubjectNoteList/SubjectNoteListContainer';

export const SubjectTabsContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({
  history,
  location,
  match,
}) => {
  const { subjectCode } = match.params;
  const { subjectNoteList, subjectInfo } = routeBuilder;
  const tabRoutes = [subjectNoteList(subjectCode), subjectInfo(subjectCode)];

  const onActiveTab = (index: number) => history.push(tabRoutes[index]);

  const findActiveIndex = (): number => tabRoutes.findIndex((tabRoute) => tabRoute === location.pathname);

  return (
    <Tabs flex justify="center" onActive={onActiveTab} activeIndex={findActiveIndex()}>
      <Tab title="Jegyzetek">
        <Box align="center">
          <Route exact path={subjectNoteList()} component={SubjectNoteListContainer} />
        </Box>
      </Tab>
      <Tab title="Tárgy info">
        <Route exact path={subjectInfo()} component={SubjectInfoContainer} />
      </Tab>
    </Tabs>
  );
};
