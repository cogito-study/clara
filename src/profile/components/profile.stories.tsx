import React from 'react';
import { profileComponents } from '../utils/storybook';
import { ChangeLanguage } from './change-language/change-language';
import { ChangePassword } from './change-password/change-password';

export default {
  title: profileComponents('Profile'),
};

// export const changeEmail = () => <ChangeEmail email="current.email@email.com" />;
export const changeLanguage = () => <ChangeLanguage />;

export const changePassword = () => <ChangePassword />;
