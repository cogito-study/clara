import { Box, Image, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import cogitoLandscape from '../assets/images/cogitoLandscape.svg';
import cogitoPortrait from '../assets/images/cogitoPortrait.svg';

import { LoginContainer } from '../containers/Login/LoginContainer';
import { RegisterContainer } from '../containers/Register/RegisterContainer';
import { routeBuilder } from '../route/routeBuilder';
import { AuthRouteParams } from '../types/RouteParams';
import { Footer } from '../ui/components';
import { ForgetPasswordCard } from '../ui/components/ForgetPassword/ForgetPasswordCard';

const AuthenticationPage: FunctionComponent<RouteComponentProps<AuthRouteParams>> = () => {
  const screenSize = useContext(ResponsiveContext);
  const { register, login, forgetPassword } = routeBuilder;

  return (
    <Box align="center">
      <Box
        fill
        align="center"
        justify="center"
        background="light"
        pad={{ bottom: 'large' }}
        style={{ minHeight: '98vh' }}
      >
        <Box fill justify="center" pad="medium" margin={{ bottom: 'large' }} align="center">
          <Box align="center" justify="center" direction="row-responsive">
            {screenSize === 'small' ? (
              <Box align="center" pad={{ vertical: 'large' }}>
                <Image src={cogitoLandscape} width="280px" />
              </Box>
            ) : (
              <Box justify="center" pad={{ left: 'small', right: 'xlarge' }}>
                <Image src={cogitoPortrait} width="200px" />
              </Box>
            )}
            <Box width="400px" align="center">
              <Route path={register()} component={RegisterContainer} />
              <Route path={login()} component={LoginContainer} />
              <Route path={forgetPassword()} component={ForgetPasswordCard} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthenticationPage;
