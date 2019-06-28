import { anchor } from './anchor';
import { button } from './button';
import { checkBox } from './check-box';
import { elevation } from './elevation';
import { formField } from './form-field';
import { breakpoints, colors, control, deviceBreakpoints, font, opacity } from './global';
import { heading } from './heading';
import { input } from './input';
import { paragraph } from './paragraph';
import { tab, tabs } from './tabs';

export const theme = {
  global: {
    colors: { ...colors },
    control: { ...control },
    font: { ...font },
    elevation: { ...elevation },
    input: { ...input },
    opacity: { ...opacity },
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
