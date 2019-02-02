import { Box, Button, Heading, Image, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';
import mail from '../../../assets/images/Mail.svg';

import alertCircle from '../../../assets/images/alertCircle.svg';
import checkCircle from '../../../assets/images/checkCircle.svg';

export interface FeedbackCardProps {
  title: string;
  icon: string;
  paragraph?: string;
  buttonHidden: boolean;
  buttonLabel?: string;
  onButtonClicked?: () => void;
}

export const FeedbackCard: FunctionComponent<FeedbackCardProps> = ({
  title,
  icon,
  paragraph,
  buttonHidden,
  buttonLabel,
  onButtonClicked,
}) => (
  <Box
    animation={{ type: 'fadeIn', duration: 500 }}
    background="white"
    elevation="large"
    align="center"
    pad={{ top: 'medium', bottom: 'large' }}
    justify="center"
    round="medium"
  >
    <Heading level="2" margin="medium" color="primary" textAlign="center">
      {title}
    </Heading>
    <Box align="center" margin={{ top: 'large', bottom: 'small' }}>
      <Image src={icon} width="100px" />
    </Box>
    <Paragraph textAlign="center" size="medium" margin={{ horizontal: 'medium', top: 'small', bottom: 'medium' }}>
      {paragraph}
    </Paragraph>
    {buttonHidden ? <div /> : <Button primary label={buttonLabel} onClick={() => onButtonClicked} />}
  </Box>
);

export const emailSentFeedbackCard: FunctionComponent = () => (
  <FeedbackCard
    title="E-mail elküldve"
    icon={mail}
    paragraph="Üzenetet küldtünk e-mailben a jelszó alaphelyzetbe állítására vonatkozó utasításokkal"
    buttonHidden={true}
  />
);

export const expiredFeedbackCard: FunctionComponent = () => (
  <FeedbackCard
    title="A link elavult 😕"
    icon={alertCircle}
    paragraph="Amennyiben még mindig vissza szeretnéd állítani jelszavad, kattints a gombra."
    buttonHidden={false}
    buttonLabel="Jelszó visszaállítás"
  />
);
export const resetDoneFeedbackCard: FunctionComponent = () => (
  <FeedbackCard
    title="Kész"
    icon={checkCircle}
    paragraph="A jelszavad visszaállítottuk. Most már be tudsz lépni az új jelszóval."
    buttonHidden={false}
    buttonLabel="Belépés"
  />
);
