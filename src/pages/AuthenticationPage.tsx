import { Box, Image, ResponsiveContext, Paragraph } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import cogitoLandscape from '../assets/images/cogitoLandscape.svg';

import { LoginContainer } from '../containers/Login/LoginContainer';
import { RegisterContainer } from '../containers/Register/RegisterContainer';
import { routeBuilder } from '../route/routeBuilder';
import { AuthRouteParams } from '../types/RouteParams';
import { Footer } from '../ui/components';
import { ForgotPasswordCard } from '../ui/components/ForgotPassword/ForgetPasswordCard';
import { Link } from '../ui/components/Link';

import LargeBetaLogo from '../assets/images/LargeBetaLogo.svg';
import SmallBetaLogo from '../assets/images/SmallBetaLogo.svg';
import { Header2 } from '../landing-page/styles';
import { colors } from '../ui/theme/global';

const AuthenticationPage: FunctionComponent<RouteComponentProps<AuthRouteParams>> = () => {
  const screenSize = useContext(ResponsiveContext);
  const { register, login, forgetPassword } = routeBuilder;

  return (
    <Box align="center">
      <Box fill align="center" background="light" pad={{ bottom: 'large' }} style={{ minHeight: '98vh' }}>
        <Box
          fill="horizontal"
          height="50px"
          margin={{ bottom: 'xlarge' }}
          background="horizontalGradient"
          align="start"
          justify="center"
        >
          {screenSize === 'small' ? (
            <Link to={routeBuilder.root()}>
              <Image src={SmallBetaLogo} height="28px" margin={{ horizontal: 'small' }} />
            </Link>
          ) : (
            <Link to={routeBuilder.root()}>
              <Image src={LargeBetaLogo} height="28px" margin={{ horizontal: 'medium' }} />
            </Link>
          )}
        </Box>
        <Box fill justify="center" pad="medium" margin={{ bottom: 'large' }} align="center">
          <Box align="center" justify="center" direction="row-responsive">
            {screenSize === 'small' ? (
              <Box align="center" pad={{ vertical: 'xlarge' }}>
                <Image src={cogitoLandscape} width="240px" />
              </Box>
            ) : (
              <Box justify="center" width="370px" margin={{ right: 'large' }}>
                <Header2 style={{ color: `${colors.primary_dark_1}` }}>
                  Az oktatás velünk nem csak intézmény, hanem közösség is
                </Header2>
                <Paragraph style={{ color: `${colors.gray}` }}>Tudás és inspiráció egy helyen, Cogito.</Paragraph>
              </Box>
            )}
            <Box width="400px" align="center">
              <Route path={register()} component={RegisterContainer} />
              <Route path={login()} component={LoginContainer} />
              <Route path={forgetPassword()} component={ForgotPasswordCard} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthenticationPage;
