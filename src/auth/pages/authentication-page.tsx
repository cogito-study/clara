import { Box, Grommet, Image, Paragraph, ResponsiveContext } from 'grommet';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import LargeBetaLogo from '../../core/assets/images/LargeBetaLogo.svg';
import { Footer } from '../../core/components/footer';
import { Link } from '../../core/components/link';
import { ForgotPasswordContainer } from '../components/forgot-password/forgot-password-container';
import { LoginContainer } from '../components/login/login-container';
import { RegisterContainer } from '../components/register/register-container';
import { ResetDoneFeedbackContainer } from '../components/reset-password/reset-done-feedback-container';
import { ResetPasswordContainer } from '../components/reset-password/reset-password-container';
import { ExpiredFeedbackCard } from '../components/ui/forgot-password/feedback-card';
import { theme as grommetTheme } from '../grommet';
import { colors, font } from '../grommet/global';
import { useAuthRoute } from '../hooks/use-auth-route';

const AuthenticationPage = () => {
  const screenSize = useContext(ResponsiveContext);
  const login = useAuthRoute({ path: 'login' });
  const register = useAuthRoute({ path: 'register' });
  const resetPassword = useAuthRoute({ path: 'reset-password' });
  const resetDone = useAuthRoute({ path: 'reset-done' });
  const forgotPassword = useAuthRoute({ path: 'forgot-password' });
  const linkExpired = useAuthRoute({ path: 'link-expired' });

  return (
    <Grommet theme={grommetTheme} style={{ overflow: 'visible' }} full>
      <Box>
        <Box fill align="start" justify="start" background="white" style={{ minHeight: '98vh' }}>
          {screenSize === 'small' ? (
            <Box
              fill="horizontal"
              height="56px"
              background="primary"
              align="center"
              justify="center"
            >
              <Link to="/">
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
              <Link to="/">
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
                  style={{
                    color: colors.primary_dark_1,
                    fontFamily: font.family,
                    fontSize: '32px',
                    lineHeight: 1.2,
                  }}
                >
                  Az oktatás velünk nem csak intézmény hanem közösség is
                </h2>
                <Paragraph style={{ color: `${colors.gray}` }}>
                  Tudás és inspiráció egy helyen, Cogito.
                </Paragraph>
              </Box>
            )}
            <Box width="400px" align="center">
              <Route path={register}>
                <RegisterContainer />
              </Route>
              <Route path={login}>
                <LoginContainer />
              </Route>
              <Route path={forgotPassword}>
                <ForgotPasswordContainer />
              </Route>
              <Route path={resetPassword}>
                <ResetPasswordContainer />
              </Route>
              <Route path={linkExpired}>
                <ExpiredFeedbackCard />
              </Route>
              <Route path={resetDone}>
                <ResetDoneFeedbackContainer />
              </Route>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Grommet>
  );
};

export default AuthenticationPage;
