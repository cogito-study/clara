import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SubjectRouteParams } from '../../core/types/route-params';
import { Footer } from '../../core/components/footer';

const SubjectPage: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = () => (
  <Box align="center">
    <Box fill background="light" pad={{ bottom: 'large' }} style={{ minHeight: '98vh' }}></Box>
    <Footer />
  </Box>
);

export default SubjectPage;
