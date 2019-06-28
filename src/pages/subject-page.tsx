import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SubjectHeaderContainer } from '../containers/subject-header/subject-header-container';
import { SubjectTabsContainer } from '../containers/subject-tabs/subject-tabs-container';
import { SubjectRouteParams } from '../types/route-params';
import { Footer } from '../ui/components/footer';

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
