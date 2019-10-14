import { Box, Grommet, Image, Paragraph, ResponsiveContext } from 'grommet';
import React, { FC, useContext } from 'react';
import LargeBetaLogo from '../../core/assets/images/LargeBetaLogo.svg';
import { Footer } from '../../core/components/footer';
import { Link } from '../../core/components/link';
import { theme as grommetTheme } from '../grommet';
import { colors, font } from '../grommet/global';

export const AuthLayout: FC = ({ children }) => {
  const screenSize = useContext(ResponsiveContext);

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
              {children}
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Grommet>
  );
};
