import React, { FunctionComponent } from 'react';
import { Box, Heading, Image, Button, Text } from 'grommet';
import betaLogo from '../../assets/images/CogitoLogoBeta.svg';
import logout from '../../assets/images/Log-out.svg';
import styled from 'styled-components';
import profile from '../../assets/images/Profile.svg';

interface Props {
  title: string;
  userName: string;
  onLogout: () => void;
}

const BorderedBox = styled(Box)`
  border: 1px solid ${(props) => props.theme.global.colors.white};
`;

export const SubjectHeader: FunctionComponent<Props> = ({ title, userName, onLogout }) => (
  <Box flex width="xlarge" height="50px" pad="xsmall" justify="between" align="center" direction="row">
    <Box basis="1/4" justify="start" align="center" direction="row">
      <Image src={betaLogo} height="30px" margin={{ horizontal: 'medium' }} />
    </Box>
    <Box basis="1/2" align="center">
      <Heading level="3" color="white" textAlign="center">
        {title}
      </Heading>
    </Box>
    <Box basis="1/4" direction="row" justify="end" align="center" pad="none" gap="small">
      <BorderedBox align="center" direction="row" round="small">
        <Text size="small" color="white" margin={{ left: 'small', vertical: 'xsmall' }}>
          {userName}
        </Text>
        <BorderedBox align="center" round="30px" margin={{ horizontal: 'small', vertical: 'none' }}>
          <Image src={profile} width="20px" />
        </BorderedBox>
      </BorderedBox>
      <Button icon={<Image src={logout} />} onClick={onLogout} />
    </Box>
  </Box>
);
