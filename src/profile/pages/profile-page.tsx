import React from 'react';
import { ContentWrapper } from '../../core/components/layout/content-wrapper';
import { ChangeEmail, ChangeLanguage, ChangePassword } from '../components';
import { ProfileInformation } from '../components/profile-information/profile-information';

export const ProfilePage = () => {
  return (
    <ContentWrapper mt={[16, 16, 20]} py={4}>
      <ProfileInformation />
      <ChangeEmail />
      <ChangePassword />
      <ChangeLanguage />
    </ContentWrapper>
  );
};
