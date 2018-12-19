import { button } from './button';
import { formField } from './formField';
import { colors, control, font } from './global';
import { tab, tabs } from './tabs';

export const theme = {
  global: {
    colors: { ...colors },
    control: { ...control },
    font: { ...font },
  },
  button: { ...button },
  formField: { ...formField },
  tab: { ...tab },
  tabs: { ...tabs },
};
