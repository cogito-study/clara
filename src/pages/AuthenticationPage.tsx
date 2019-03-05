import { Box, Image, Paragraph, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import LargeBetaLogo from '../assets/images/LargeBetaLogo.svg';
import { ForgotPasswordContainer } from '../containers/ForgotPassword/ForgotPasswordContainer';
import { LoginContainer } from '../containers/Login/LoginContainer';
import { RegisterContainer } from '../containers/Register/RegisterContainer';
import { ResetDoneFeedbackContainer } from '../containers/ResetPassword/ResetDoneFeedbackContainer';
import { ResetPasswordContainer } from '../containers/ResetPassword/ResetPasswordContainer';
import { Header2 } from '../landing-page/styles';
import { routeBuilder } from '../route/routeBuilder';
import { AuthRouteParams } from '../types/RouteParams';
import { Footer } from '../ui/components';
import { EmailSentFeedbackCard, ExpiredFeedbackCard } from '../ui/components/ForgotPassword/FeedbackCard';
import { Link } from '../ui/components/Link';
import { colors } from '../ui/theme/global';

const AuthenticationPage: FunctionComponent<RouteComponentProps<AuthRouteParams>> = () => {
  const screenSize = useContext(ResponsiveContext);
  const { register, login, forgetPassword, emailSent, resetPassword, linkExpired, resetDone } = routeBuilder;

  return (
    <Box>
      <Box fill align="start" justify="start" background="white" style={{ minHeight: '98vh' }}>
        {screenSize === 'small' ? (
          <Box fill="horizontal" height="56px" background="primary" align="center" justify="center">
            <Link to={routeBuilder.root()}>
              <Box height="39px" justify="center">
                <Image src={LargeBetaLogo} height="30px" />
              </Box>
            </Link>
          </Box>
        ) : (
          <Box
            fill="horizontal"
            height="80px"
            margin={{ bottom: 'xlarge' }}
            background="primary"
            align="center"
            justify="center"
          >
            <Link to={routeBuilder.root()}>
              <Image src={LargeBetaLogo} height="42px" />
            </Link>
          </Box>
        )}

        <Box fill style={{ minHeight: '60vh' }} align="center" justify="center" direction="row">
          {screenSize === 'small' ? (
            <Box />
          ) : (
            <Box justify="center" width="370px" margin={{ right: 'large' }}>
              <Header2 style={{ color: `${colors.primary_dark_1}` }}>
                Az oktatás velünk nem csak intézmény hanem közösség is
              </Header2>
              <Paragraph style={{ color: `${colors.gray}` }}>Tudás és inspiráció egy helyen, Cogito.</Paragraph>
            </Box>
          )}
          <Box width="400px" align="center">
            <Route path={register()} component={RegisterContainer} />
            <Route path={login()} component={LoginContainer} />
            <Route path={forgetPassword()} component={ForgotPasswordContainer} />
            <Route path={emailSent()} component={EmailSentFeedbackCard} />
            <Route path={resetPassword()} component={ResetPasswordContainer} />
            <Route path={linkExpired()} component={ExpiredFeedbackCard} />
            <Route path={resetDone()} component={ResetDoneFeedbackContainer} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthenticationPage;
