import React, { FunctionComponent } from 'react';
import { Box, Heading, Image, Button } from 'grommet';
import betaLogo from '../../assets/images/CogitoLogoBeta.svg';
import logout from '../../assets/images/Log-out.svg';

interface Props {
  title: string;
  userName: string;
  onLogout: () => void;
}

export const SubjectHeader: FunctionComponent<Props> = ({ title, userName, onLogout }) => (
  <Box flex width="xlarge" height="60px" pad="xsmall" justify="between" align="center" direction="row">
    <Box basis="1/4" justify="center" align="center" direction="row">
      <Image src={betaLogo} width="150px" />
    </Box>
    <Box basis="1/2">
      <Heading level="2" color="white" textAlign="center">
        {title}
      </Heading>
    </Box>
    <Box basis="1/4" direction="row" justify="end" align="center" gap="small">
      <Heading level="4" color="white" margin="small">
        {userName}
      </Heading>
      <Box height="23px" background="white" width="2px" />
      <Button icon={<Image src={logout} />} onClick={onLogout} />
    </Box>
  </Box>
);
