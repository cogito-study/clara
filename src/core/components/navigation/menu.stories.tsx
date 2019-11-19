import React from 'react';
import { coreComponents } from '../../utils/storybook';
import { MainMenu, MainMenuProps } from './menu';
import { PageTitleHeader } from './page-title-header';

export default {
  title: coreComponents('Menu'),
};

const subjects: MainMenuProps = {
  subjects: [
    { id: 'asd1', name: 'Vasular surgery 1', code: '/vascularsurgery' },
    { id: 'asd2', name: 'Vasular surgery 2', code: '/vascularsurgery' },
    { id: 'asd3', name: 'Vasular surgery 3', code: '/vascularsurgery' },
    { id: 'asd4', name: 'Vasular surgery 4', code: '/vascularsurgery' },
    { id: 'asd5', name: 'Vasular surgery 5', code: '/vascularsurgery' },
  ],
};

export const mainMenu = () => <MainMenu />;
export const mainMenuWithSubjects = () => <MainMenu {...subjects} />;
export const pageTitleHeader = () => <PageTitleHeader title="News feed" />;
