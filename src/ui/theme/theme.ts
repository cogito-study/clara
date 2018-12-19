import { button } from './button';
import { tab, tabs } from './tabs';

export const theme = {
  global: {
    colors: {
      primary: '#4787D3',
      gradient: 'linear-gradient(306.87deg, #4787D3 0%, #67BCFB 100%)',
      light: '#FBFBFB',
      dark: '#101010',
      grey: '#595959',
      lightGrey: '#9C9C9C',
      transparent: 'rgba(0, 0, 0, 0.0);',
    },
    control: {
      border: {
        radius: '24px',
      },
    },
    font: {
      family: 'Montserrat',
      size: '16px',
    },
  },
  button: { ...button },
  paragraph: {
    extend: (props) => `
    max-width: 2000px;
    `,
  },
  formField: {
    border: false,
    font: {
      size: '16px',
    },
  },
  tab: { ...tab },
  tabs: { ...tabs },
};
