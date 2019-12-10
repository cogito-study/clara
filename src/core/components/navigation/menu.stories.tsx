import React from 'react';
import { coreComponents } from '../../utils/storybook';
import { MainMenu } from './menu';
import { MenuSubjectsPlaceholder, MobileMenuTitlePlaceholder } from './menu.placeholder';
import { PageTitleHeader } from './page-title-header';

export default {
  title: coreComponents('Menu'),
};

export const menu = () => <MainMenu />;

export const menuSubjectsPlaceholder = () => <MenuSubjectsPlaceholder />;

export const mobileMenuTitlePlaceholder = () => <MobileMenuTitlePlaceholder />;

export const titleLoadingMenu = () => <MainMenu titleLoading />;

export const menuWithSubjects = () => <MainMenu />;

export const pageTitleHeader = () => <PageTitleHeader title="News feed" />;
