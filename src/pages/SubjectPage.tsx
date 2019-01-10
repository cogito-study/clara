import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { SubjectHeaderContainer } from '../containers/SubjectHeader/SubjectHeaderContainer';
import { SubjectTabsContainer } from '../containers/SubjectTabs/SubjectTabsContainer';
import { SubjectRouteParams } from '../types/RouteParams';
import { Footer } from '../ui/components/Footer';

const BoxWithHeight = styled(Box)`
  min-height: 98vh;
`;

const SubjectPage: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = (props) => (
  <Box align="center">
    <BoxWithHeight fill background="light" pad={{ bottom: 'large' }}>
      <SubjectHeaderContainer {...props} />
      <SubjectTabsContainer {...props} />
    </BoxWithHeight>
    <Footer />
  </Box>
);

export default SubjectPage;
