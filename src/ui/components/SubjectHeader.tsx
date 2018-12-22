import React, { FunctionComponent } from 'react';
import { Box, Heading, Image, Button, Text } from 'grommet';
import { Logout } from 'grommet-icons';
import logo from '../../assets/images/logo.svg';
import styled from 'styled-components';

interface Props {
  title: string;
  userName: string;
  onLogout: () => void;
}

const BetaBox = styled(Box)`
  min-width: 45px;
`;

export const SubjectHeader: FunctionComponent<Props> = ({ title, userName, onLogout }) => (
  <Box flex width="xlarge" height="60px" pad="xsmall" justify="between" align="center" direction="row">
    <Box basis="1/4" justify="center" align="center" direction="row">
      <Image src={logo} width="150px" />
      <BetaBox
        margin={{ horizontal: 'medium', top: '4px', bottom: 'none' }}
        height="20px"
        round="xsmall"
        background="white"
      >
        <Text
          textAlign="center"
          alignSelf="center"
          size="11px"
          weight="bold"
          margin={{ horizontal: 'xsmall', top: '3px', bottom: 'none' }}
          color="primary"
        >
          BETA
        </Text>
      </BetaBox>
    </Box>
    <Box basis="1/2">
      <Heading level="2" color="white" textAlign="center">
        {title}
      </Heading>
    </Box>
    <Box basis="1/4" direction="row" justify="end" align="center" gap="small">
      <Heading level="4" color="white">
        {userName}
      </Heading>
      <Button icon={<Logout color="white" />} onClick={onLogout} />
    </Box>
  </Box>
);
