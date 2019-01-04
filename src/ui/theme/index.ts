import { button } from './button';
import { checkBox } from './checkBox';
import { colors, control, font, breakpoints, deviceBreakpoints } from './global';
import { formField } from './formField';
import { paragraph } from './paragraph';
import { tab, tabs } from './tabs';
import { elevation } from './elevation';

export const theme = {
  global: {
    colors: { ...colors },
    control: { ...control },
    font: { ...font },
    elevation: { ...elevation },
    input: {
      padding: `10px`,
      weight: 500,
    },
  },
  breakpoints: { ...breakpoints },
  button: { ...button },
  deviceBreakpoints: { ...deviceBreakpoints },
  checkBox: { ...checkBox },
  formField: { ...formField },
  paragraph: { ...paragraph },
  tab: { ...tab },
  tabs: { ...tabs },
};
