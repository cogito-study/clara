import React, { FunctionComponent, ReactNode } from 'react';
import { Box, Tabs, Tab } from 'grommet';
import { RouteComponentProps, withRouter, Route } from 'react-router-dom';

import { routePath } from '../constants/routePath';
import { SubjectInfoContainer } from './SubjectInfoContainer';
import { SubjectNoteListContainer } from './SubjectNoteListContainer';

interface SubjectTab {
  title: string;
  path: string;
  component: FunctionComponent;
}

const subjectTabs: SubjectTab[] = [
  { title: 'Jegyzetek', path: routePath.subjectNotes, component: SubjectNoteListContainer },
  { title: 'Tantárgy info', path: routePath.subjectInfo, component: SubjectInfoContainer },
];

const SubjectTabs: FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const onActiveTab = (index: number) => {
    console.log(index);
    history.push(subjectTabs[index].path);
  };

  const findActiveIndex = (): number => subjectTabs.findIndex((tab) => tab.path === location.pathname);

  const renderTabs = (): ReactNode =>
    subjectTabs.map((tab, index) => (
      <Tab key={index} title={tab.title}>
        <Route path={tab.path} component={tab.component} />
      </Tab>
    ));

  return (
    <Box fill="horizontal" background="gradient" align="center" justify="center">
      <Tabs flex onActive={onActiveTab} activeIndex={findActiveIndex()}>
        {renderTabs()}
      </Tabs>
    </Box>
  );
};

export const SubjectTabsContainer = withRouter(SubjectTabs);
