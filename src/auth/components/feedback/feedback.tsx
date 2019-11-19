import React, { FC, ReactNode } from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/core';

export interface FeedbackProps {
  title: string;
  icon: ReactNode;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export const Feedback: FC<FeedbackProps> = ({
  title,
  icon,
  description,
  buttonLabel,
  onButtonClick,
}) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    py={8}
    px={12}
    bg="#fff"
    borderColor="grey.200"
    borderWidth={1}
  >
    <Heading as="h2" fontSize="lg" color="blue.800" mb={8}>
      {title}
    </Heading>
    {icon}
    <Text color="grey.600" textAlign="center" mt={8}>
      {description}
    </Text>
    {onButtonClick && (
      <Button
        variantColor="teal"
        color="blue.800"
        width="100%"
        borderRadius={0}
        mt={6}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    )}
  </Flex>
);

// export const ExpiredFeedback = () => (
//   <FeedbackCard
//     title="A link elavult 😕"
//     icon={alertCircle}
//     paragraph="Amennyiben még mindig vissza szeretnéd állítani jelszavad, kattints a gombra."
//     buttonLabel="Jelszó visszaállítás"
//     onButtonClick={() => alert('Még definiálni kell, hogy a reset password screenre vigyen!')}
//   />
// );

// export const PasswordResetDoneFeedback: FC<FeedbackProps> = ({ onButtonClick }) => (
//   <FeedbackCard
//     title="Kész"
//     icon={checkCircle}
//     paragraph="A jelszavad visszaállítottuk. Most már be tudsz lépni új jelszavaddal."
//     buttonLabel="Belépés"
//     onButtonClick={onButtonClick}
//   />
// );

// export const EmailSentFeedbackCard = () => (
//   <FeedbackCard
//     title="E-mail elküldve"
//     icon={mail}
//     paragraph="Elküldtük a megadott e-mail címre az új jelszó beállításához szükséges linket."
//   />
// );
