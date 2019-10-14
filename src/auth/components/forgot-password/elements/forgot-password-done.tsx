import { Box, Heading, Image, Paragraph } from 'grommet';
import React from 'react';
import mail from '../../../../core/assets/images/Mail.svg';

export const ForgotPasswordCardSent = () => (
  <Box
    animation={{ type: 'fadeIn', duration: 500 }}
    background="white"
    elevation="large"
    align="center"
    pad={{ vertical: 'medium' }}
    justify="center"
    round="medium"
  >
    <Heading level="2" margin="medium" color="primary" textAlign="center">
      Jelszó visszaállítása
    </Heading>
    <Box align="center" margin={{ top: 'large', bottom: 'small' }}>
      <Image src={mail} width="100px" />
    </Box>
    <Paragraph
      textAlign="center"
      size="medium"
      margin={{ horizontal: 'medium', top: 'small', bottom: 'large' }}
    >
      Üzenetet küldtünk e-mailben a jelszó alaphelyzetbe állítására vonatkozó utasításokkal
    </Paragraph>
  </Box>
);
