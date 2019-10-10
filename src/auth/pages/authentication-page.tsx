import { Box, Grommet, Image, Paragraph, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import LargeBetaLogo from '../../core/assets/images/LargeBetaLogo.svg';
import { Footer } from '../../core/components/footer';
import { Link } from '../../core/components/link';
import { routeBuilder } from '../../core/route/route-builder';
import { AuthRouteParams } from '../../core/types/route-params';
import { ForgotPasswordContainer } from '../components/forgot-password/forgot-password-container';
import { LoginContainer } from '../components/login/login-container';
import { RegisterContainer } from '../components/register/register-container';
import { ResetDoneFeedbackContainer } from '../components/reset-password/reset-done-feedback-container';
import { ResetPasswordContainer } from '../components/reset-password/reset-password-container';
import { EmailSentFeedbackCard, ExpiredFeedbackCard } from '../components/ui/forgot-password/feedback-card';
import { theme as grommetTheme } from '../grommet';
import { colors, font } from '../grommet/global';

const AuthenticationPage: FunctionComponent<RouteComponentProps<AuthRouteParams>> = () => {
  const screenSize = useContext(ResponsiveContext);
  const { register, login, forgetPassword, emailSent, resetPassword, linkExpired, resetDone } = routeBuilder;

  return (
    <Grommet theme={grommetTheme} style={{ overflow: 'visible' }} full>
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
                <h2
                  style={{ color: colors.primary_dark_1, fontFamily: font.family, fontSize: '32px', lineHeight: 1.2 }}
                >
                  Az oktatás velünk nem csak intézmény hanem közösség is
                </h2>
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
    </Grommet>
  );
};

export default AuthenticationPage;
