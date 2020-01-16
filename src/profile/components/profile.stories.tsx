import React from 'react';
import { profileComponents } from '../utils/storybook';
import { ChangeLanguage } from './change-language/change-language';
import { ChangePassword } from './change-password/change-password';
import { ProfileInformation } from './profile-information/profile-information';
import { ProfileInformationPlaceholder } from './profile-information/profile-information.placeholder';

export default {
  title: profileComponents('Profile'),
};

// export const changeEmail = () => <ChangeEmail email="current.email@email.com" />;
export const changeLanguage = () => <ChangeLanguage />;

export const changePassword = () => <ChangePassword />;

export const profileInformation = () => <ProfileInformation />;

export const profileInformationPlaceholder = () => <ProfileInformationPlaceholder />;
