import React from 'react';
import { ContentWrapper } from '../../core/components/layout/content-wrapper';
import { useDocumentTitle } from '../../core/hooks';
import { ChangeEmail, ChangeLanguage, ChangePassword } from '../components';
import { ProfileInformation } from '../components/profile-information/profile-information';
import { useMyUserQuery } from './graphql/my-user-query.generated';

export const ProfilePage = () => {
  const { data } = useMyUserQuery();

  useDocumentTitle(data?.me.fullName);
  const userID = data?.me.id;

  return (
    <ContentWrapper mt={[16, 16, 20]} py={4}>
      <ProfileInformation email={data?.me.email} fullName={data?.me.fullName} />
      <ChangeEmail userID={userID} email={data?.me.email} />
      <ChangePassword userID={userID} />
      <ChangeLanguage userID={userID} />
    </ContentWrapper>
  );
};
