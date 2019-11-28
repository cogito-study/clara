import React from 'react';
import { ContentWrapper } from '../../core/components/layout/content-wrapper';
import { ChangeEmail, ChangeLanguage, ChangePassword, ProfileInfos } from '../components';

export const ProfilePage = () => {
  return (
    <ContentWrapper mt={[10, 10, 20]} py={4}>
      <ProfileInfos name="Full Name" email="firstname.lastname@cogito.study " />
      <ChangeEmail email="current.email@email.com" />
      <ChangePassword />
      <ChangeLanguage />
    </ContentWrapper>
  );
};
