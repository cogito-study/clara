import { Anchor, Box, BoxProps, Heading, Image, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';
import profile from '../../../assets/images/Profile.svg';

export interface TeacherInfoProps {
  name: string;
  roleName: string;
  phone?: string;
  email: string;
  profilePicURL?: string;
}

export const TeacherInfo: FunctionComponent<BoxProps & TeacherInfoProps> = ({
  name,
  roleName,
  phone,
  email,
  profilePicURL,
  ...rest
}) => (
  <Box direction="row" align="center" margin={{ vertical: 'medium' }} style={{ maxWidth: '320px' }} {...rest}>
    <Image
      src={profilePicURL || profile}
      width="80px"
      margin={{ right: 'medium' }}
      style={{ boxShadow: 'inset 0px 3px 6px rgba(0, 0, 0, 0.4)', borderRadius: '100%' }}
    />
    <Box>
      <Heading color="gray_dark_4" level="4" margin="none">
        {name}
      </Heading>
      <Paragraph color="gray_light_1" margin="none">
        {roleName.toLowerCase()}
      </Paragraph>
      <Anchor
        color="primary"
        label={phone}
        href={`tel:${phone}`}
        size="small"
        margin="none"
        style={{ fontWeight: 'normal' }}
      />
      <Anchor
        color="primary"
        label={email}
        href={`mailto:${email}`}
        size="small"
        margin="none"
        style={{ fontWeight: 'normal' }}
      />
    </Box>
  </Box>
);
