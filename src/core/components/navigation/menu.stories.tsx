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

export const subjectsLoadingMenu = () => <MainMenu subjectsLoading />;

export const loadingMenu = () => <MainMenu titleLoading subjectsLoading />;

export const menuWithSubjects = () => (
  <MainMenu
    subjects={[
      { id: 'asd1', name: 'Vasular surgery 1', code: '/vascularsurgery1' },
      { id: 'asd2', name: 'Vasular surgery 2', code: '/vascularsurgery2' },
      { id: 'asd3', name: 'Vasular surgery 3', code: '/vascularsurgery3' },
      { id: 'asd4', name: 'Vasular surgery 4', code: '/vascularsurgery4' },
      { id: 'asd5', name: 'Vasular surgery 5', code: '/vascularsurgery5' },
    ]}
  />
);

export const pageTitleHeader = () => <PageTitleHeader title="News feed" />;
