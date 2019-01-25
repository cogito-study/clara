import { Box, BoxProps, Heading, Image, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

import profile from '../../../assets/images/Profile.svg';

export interface TeacherInfoProps {
  name: string;
  role: string;
  phoneNumber: string;
  email: string;
}

export const TeacherInfo: FunctionComponent<BoxProps & TeacherInfoProps> = ({
  name,
  role,
  phoneNumber,
  email,
  ...rest
}) => (
  <Box direction="row" width="320px" align="center" margin={{ vertical: 'medium' }} {...rest}>
    <Image
      src={profile}
      width="80px"
      margin={{ right: 'medium' }}
      style={{ boxShadow: 'inset 0px 3px 6px rgba(0, 0, 0, 0.4)', borderRadius: '100%' }}
    />
    <Box>
      <Heading color="gray_dark_4" level="4" margin="none">
        {name}
      </Heading>
      <Paragraph color="gray_light_1" margin="none">
        {role}
      </Paragraph>
      <Paragraph color="primary" size="small" margin="none">
        {phoneNumber}
      </Paragraph>
      <Paragraph color="primary" size="small" margin="none">
        {email}
      </Paragraph>
    </Box>
  </Box>
);
