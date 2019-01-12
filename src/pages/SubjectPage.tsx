import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { SubjectHeaderContainer } from '../containers/SubjectHeader/SubjectHeaderContainer';
import { SubjectTabsContainer } from '../containers/SubjectTabs/SubjectTabsContainer';
import { SubjectRouteParams } from '../types/RouteParams';
import { Footer } from '../ui/components/Footer';

const SubjectPage: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => (
  <Box align="center">
    <Box fill background="light" pad={{ bottom: 'large' }} style={{ minHeight: '98vh' }}>
      <SubjectHeaderContainer {...props} />
      <SubjectTabsContainer {...props} />
    </Box>
    <Footer />
  </Box>
);

export default SubjectPage;
