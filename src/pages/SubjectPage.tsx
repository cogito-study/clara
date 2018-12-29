import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box } from 'grommet';
import { SubjectHeaderContainer } from '../containers/SubjectHeaderContainer';
import { SubjectTabsContainer } from '../containers/SubjectTabsContainer';
import { SubjectRouteParams } from '../types/RouteParams';

const SubjectPage: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => (
  <Box fill background="light">
    <SubjectHeaderContainer {...props} />
    <SubjectTabsContainer {...props} />
  </Box>
);

export default SubjectPage;
