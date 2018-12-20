import { button } from './button';
import { colors, control, font } from './global';
import { formField } from './formField';
import { paragraph } from './paragraph';
import { tab, tabs } from './tabs';

export const theme = {
  global: {
    colors: { ...colors },
    control: { ...control },
    font: { ...font },
  },
  button: { ...button },
  formField: { ...formField },
  paragraph: { ...paragraph },
  tab: { ...tab },
  tabs: { ...tabs },
};
