import React, { FC } from 'react';
import { FeedbackCard } from '../../elements/feedback-card';
import checkCircle from '../../../../core/assets/images/checkCircle.svg';

export interface ResetDoneFeedbackCardProps {
  onButtonClick: () => void;
}

export const ResetDoneFeedbackCard: FC<ResetDoneFeedbackCardProps> = ({ onButtonClick }) => (
  <FeedbackCard
    title="Kész"
    icon={checkCircle}
    paragraph="A jelszavad visszaállítottuk. Most már be tudsz lépni új jelszavaddal."
    buttonLabel="Belépés"
    onButtonClick={onButtonClick}
  />
);
