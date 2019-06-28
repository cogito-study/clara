import { ThemeContext } from 'grommet';
import { useContext } from 'react';

import { theme } from '../ui/theme';

type GrommetTheme = typeof theme;

export const useGrommetTheme = (): GrommetTheme => useContext(ThemeContext) as GrommetTheme;
