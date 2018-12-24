import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, Grommet } from 'grommet';
import { theme } from '../ui/theme';

import { SubjectHeaderContainer } from '../containers/SubjectHeaderContainer';
import { SubjectTabsContainer } from '../containers/SubjectTabsContainer';
import { SubjectRouteParams } from '../types/RouteParams';

const SubjectPage: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => (
  <Grommet theme={theme} full>
    <Box fill background="light">
      <SubjectHeaderContainer {...props} />
      <SubjectTabsContainer {...props} />
    </Box>
  </Grommet>
);

export default SubjectPage;
