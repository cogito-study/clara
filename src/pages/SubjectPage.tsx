import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SubjectHeaderContainer } from '../containers/SubjectHeaderContainer';
import { SubjectTabsContainer } from '../containers/SubjectTabsContainer';
import { SubjectRouteParams } from '../types/RouteParams';

const SubjectPage: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => (
  <Box fill background="light" elevation="medium">
    <SubjectHeaderContainer {...props} />
    <SubjectTabsContainer {...props} />
  </Box>
);

export default SubjectPage;
