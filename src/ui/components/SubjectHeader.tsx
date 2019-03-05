import { Box, Button, Heading, Image, ResponsiveContext, Text } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import LargeBetaLogo from '../../assets/images/LargeBetaLogo.svg';
import logout from '../../assets/images/Log-out.svg';
import profile from '../../assets/images/Profile.svg';
import SmallBetaLogo from '../../assets/images/SmallBetaLogo.svg';
import { HeadingPlaceholder } from './Placeholder/HeadingPlaceholder';
import { theme } from '../theme';
import { LinePlaceholder } from './Placeholder/LinePlaceholder';

interface Props {
  title: string;
  userName: string;
  onLogout: () => void;
  isLoading?: boolean;
}

export const SubjectHeader: FunctionComponent<Props> = ({ title, userName, onLogout, isLoading }) => {
  const screenSize = useContext(ResponsiveContext);
  return (
    <Box flex width="xlarge" height="50px" pad="xsmall" justify="between" align="center" direction="row">
      <Box basis="1/3" justify="start" align="center" direction="row">
        {screenSize === 'small' ? (
          <Image src={SmallBetaLogo} height="28px" margin={{ horizontal: 'small' }} />
        ) : (
          <Image src={LargeBetaLogo} height="34px" margin={{ horizontal: 'medium' }} />
        )}
      </Box>
      <Box basis="1/3" align="center">
        {isLoading ? (
          <HeadingPlaceholder
            level={4}
            width="90%"
            align="center"
            startColor={theme.global.colors.primary}
            endColor={theme.global.colors.primary_light_1}
          />
        ) : (
          <Heading level="3" color="white" textAlign="center">
            {title}
          </Heading>
        )}
      </Box>
      <Box basis="1/3" direction="row" justify="end" align="center" pad="none" gap="xsmall">
        {screenSize === 'small' ? (
          <div />
        ) : (
          <Box align="center" direction="row" round="10px" style={{ border: '1.5px solid white' }}>
            <Box margin={{ left: 'small' }}>
              {isLoading ? (
                <LinePlaceholder
                  width={110}
                  align="center"
                  startColor={theme.global.colors.primary}
                  endColor={theme.global.colors.primary_light_1}
                />
              ) : (
                <Text size="12px" color="white" margin={{ vertical: '9px' }}>
                  {userName}
                </Text>
              )}
            </Box>

            <Box
              align="center"
              justify="center"
              round="50px"
              margin={{ horizontal: 'small', vertical: 'none' }}
              style={{ border: '1px solid white' }}
            >
              <Image src={profile} width="18px" margin="1px" />
            </Box>
          </Box>
        )}

        <Button
          label={true}
          color="white"
          icon={<Image src={logout} height="20px" />}
          margin="xsmall"
          onClick={onLogout}
        />
      </Box>
    </Box>
  );
};
