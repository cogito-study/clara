import { anchor } from './anchor';
import { button } from './button';
import { checkBox } from './checkBox';
import { elevation } from './elevation';
import { formField } from './formField';
import { breakpoints, colors, control, deviceBreakpoints, font } from './global';
import { input } from './input';
import { paragraph } from './paragraph';
import { tab, tabs } from './tabs';
import { heading } from './heading';

export const theme = {
  global: {
    colors: { ...colors },
    control: { ...control },
    font: { ...font },
    elevation: { ...elevation },
    input: { ...input },
  },
  anchor: { ...anchor },
  breakpoints: { ...breakpoints },
  button: { ...button },
  deviceBreakpoints: { ...deviceBreakpoints },
  checkBox: { ...checkBox },
  formField: { ...formField },
  heading: { ...heading },
  paragraph: { ...paragraph },
  tab: { ...tab },
  tabs: { ...tabs },
};
