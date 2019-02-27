import { Box, Button, Heading, Image, Paragraph } from 'grommet';
import React, { FunctionComponent } from 'react';

import mail from '../../../assets/images/Mail.svg';

import alertCircle from '../../../assets/images/alertCircle.svg';
import checkCircle from '../../../assets/images/checkCircle.svg';

export interface FeedbackCardProps {
  title: string;
  icon: string;
  paragraph?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export interface ResetDoneFeedbackCardProps {
  onButtonClick: () => void;
}

export const FeedbackCard: FunctionComponent<FeedbackCardProps> = ({
  title,
  icon,
  paragraph,
  buttonLabel,
  onButtonClick,
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
    {onButtonClick && <Button primary label={buttonLabel} onClick={onButtonClick} />}
  </Box>
);

export const EmailSentFeedbackCard: FunctionComponent = () => (
  <FeedbackCard
    title="E-mail elküldve"
    icon={mail}
    paragraph="Elküldtük a megadott e-mail címre az új jelszó beállításához szükséges linket."
  />
);

export const ExpiredFeedbackCard: FunctionComponent = () => (
  <FeedbackCard
    title="A link elavult 😕"
    icon={alertCircle}
    paragraph="Amennyiben még mindig vissza szeretnéd állítani jelszavad, kattints a gombra."
    buttonLabel="Jelszó visszaállítás"
    onButtonClick={() => alert('Még definiálni kell, hogy a reset password screenre vigyen!')}
  />
);
export const ResetDoneFeedbackCard: FunctionComponent<ResetDoneFeedbackCardProps> = ({ onButtonClick }) => (
  <FeedbackCard
    title="Kész"
    icon={checkCircle}
    paragraph="A jelszavad visszaállítottuk. Most már be tudsz lépni új jelszavaddal."
    buttonLabel="Belépés"
    onButtonClick={onButtonClick}
  />
);
