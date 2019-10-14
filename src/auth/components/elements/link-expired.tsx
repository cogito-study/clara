import React from 'react';
import { FeedbackCard } from './feedback-card';
import alertCircle from '../../../core/assets/images/alertCircle.svg';

export const ExpiredFeedbackCard = () => (
  <FeedbackCard
    title="A link elavult 😕"
    icon={alertCircle}
    paragraph="Amennyiben még mindig vissza szeretnéd állítani jelszavad, kattints a gombra."
    buttonLabel="Jelszó visszaállítás"
    onButtonClick={() => alert('Még definiálni kell, hogy a reset password screenre vigyen!')}
  />
);
