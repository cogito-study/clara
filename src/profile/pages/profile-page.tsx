import React, { Suspense } from 'react';
import { ContentWrapper, Head } from '../../core/components';
import { ChangeEmail, ChangeLanguage, ChangePassword } from '../components';
import { ProfileInformation } from '../components/profile-information/profile-information';
import { ProfileInformationPlaceholder } from '../components/profile-information/profile-information.placeholder';
import { useMyUserQuery } from './graphql/my-user-query.generated';

export const ProfilePage = () => {
  const { data, loading } = useMyUserQuery();
  const userID = data?.me.id;

  return (
    <>
      <Head title={data?.me.fullName} />
      <ContentWrapper mt={[16, 16, 20]} py={4}>
        {loading ? (
          <ProfileInformationPlaceholder />
        ) : (
          <Suspense fallback={<ProfileInformationPlaceholder />}>
            <ProfileInformation email={data?.me.email} fullName={data?.me.fullName} />
            <ChangeEmail userID={userID} email={data?.me.email} />
            <ChangePassword userID={userID} />
            <ChangeLanguage userID={userID} />
          </Suspense>
        )}
      </ContentWrapper>
    </>
  );
};
