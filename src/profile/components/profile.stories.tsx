import React from 'react';
import { profileComponents } from '../utils/storybook';
import { ChangeEmail } from './change-email';
import { ChangePassword } from './change-password';
import { ChangeLanguage } from './change-language';

import { ProfileInfos } from './profile-infos';

export default {
  title: profileComponents('Profile'),
};

export const profileInfos = () => (
  <ProfileInfos name="Full Name" email="firstname.lastname@cogito.study " />
);
export const changeEmail = () => <ChangeEmail email="current.email@email.com" />;
export const changeLanguage = () => <ChangeLanguage />;

export const changePassword = () => <ChangePassword />;
