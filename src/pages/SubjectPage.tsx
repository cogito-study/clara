import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box } from 'grommet';

import { SubjectHeaderContainer } from '../containers/SubjectHeaderContainer';
import { SubjectTabsContainer } from '../containers/SubjectTabsContainer';

const SubjectPage: FunctionComponent<RouteComponentProps> = ({ match }) => (
  <Box fill>
    <SubjectHeaderContainer />
    <SubjectTabsContainer />
  </Box>
);

export default SubjectPage;
