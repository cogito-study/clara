import { Box, Button, Heading, Image, ResponsiveContext, Text } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';

import LargeBetaLogo from '../../assets/images/LargeBetaLogo.svg';
import logout from '../../assets/images/Log-out.svg';
import profile from '../../assets/images/Profile.svg';
import SmallBetaLogo from '../../assets/images/SmallBetaLogo.svg';

interface Props {
  title: string;
  userName: string;
  onLogout: () => void;
}

export const SubjectHeader: FunctionComponent<Props> = ({ title, userName, onLogout }) => {
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
        <Heading level="3" color="white" textAlign="center">
          {title}
        </Heading>
      </Box>
      <Box basis="1/3" direction="row" justify="end" align="center" pad="none" gap="xsmall">
        {screenSize === 'small' ? (
          <div />
        ) : (
          <Box align="center" direction="row" round="16px" style={{ border: '1px solid white' }}>
            <Text size="small" color="white" margin={{ left: 'small', vertical: 'xsmall' }}>
              {userName}
            </Text>
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
          margin="small"
          onClick={onLogout}
        />
      </Box>
    </Box>
  );
};
