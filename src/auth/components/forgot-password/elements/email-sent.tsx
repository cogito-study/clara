import React from 'react';
import { FeedbackCard } from '../../elements/feedback-card';
import mail from '../../../../core/assets/images/Mail.svg';

export const EmailSentFeedbackCard = () => (
  <FeedbackCard
    title="E-mail elküldve"
    icon={mail}
    paragraph="Elküldtük a megadott e-mail címre az új jelszó beállításához szükséges linket."
  />
);
