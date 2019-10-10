import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NoteRouteParams } from '../../core/types/route-params';

const NotePage: FunctionComponent<RouteComponentProps<NoteRouteParams>> = () => <Box background="gray_light_3"></Box>;

export default NotePage;
