import { useTheme as useEmotionTheme } from 'emotion-theming';
import { Theme } from '../style';

export const useTheme = () => useEmotionTheme<Theme>();
