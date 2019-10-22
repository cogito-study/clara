import React from 'react';
import { coreComponents } from '../../utils/storybook';
import { MainMenu, MainMenuProps } from './menu';

export default {
  title: coreComponents('Menu'),
};

const subjects: MainMenuProps = {
  subjects: [
    { label: 'Vasular surgery 1', link: '/vascularsurgery' },
    { label: 'Vasular surgery 2', link: '/vascularsurgery' },
    { label: 'Vasular surgery 3', link: '/vascularsurgery' },
    { label: 'Vasular surgery 4', link: '/vascularsurgery' },
    { label: 'Vasular surgery 5', link: '/vascularsurgery' },
  ],
};

export const mainMenu = () => <MainMenu />;
export const mainMenuWithSubjects = () => <MainMenu {...subjects} />;
