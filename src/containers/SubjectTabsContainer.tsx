import React, { FunctionComponent, ReactNode } from 'react';
import { Tabs, Tab } from 'grommet';
import { RouteComponentProps, withRouter, Route } from 'react-router-dom';

import { routePath } from '../constants';
import { SubjectInfoContainer } from './SubjectInfoContainer';
import { SubjectNoteListContainer } from './SubjectNoteListContainer';

interface SubjectTab {
  title: string;
  path: string;
  component: FunctionComponent;
}

const SubjectTabs: FunctionComponent<RouteComponentProps<{ subjectCode: string }>> = ({ history, location, match }) => {
  const { subjectCode } = match.params;
  const subjectTabs: SubjectTab[] = [
    { title: 'Jegyzetek', path: routePath.subjectNoteList(subjectCode), component: SubjectNoteListContainer },
    { title: 'Tantárgy info', path: routePath.subjectInfo(subjectCode), component: SubjectInfoContainer },
  ];

  const onActiveTab = (index: number) => history.push(subjectTabs[index].path);

  const findActiveIndex = (): number => subjectTabs.findIndex((tab) => tab.path === location.pathname);

  const renderTabs = (): ReactNode =>
    subjectTabs.map((tab, index) => (
      <Tab key={index} title={tab.title}>
        <Route exact path={tab.path} component={tab.component} />
      </Tab>
    ));

  return (
    <Tabs flex justify="center" onActive={onActiveTab} activeIndex={findActiveIndex()}>
      {renderTabs()}
    </Tabs>
  );
};

export const SubjectTabsContainer = withRouter(SubjectTabs);
