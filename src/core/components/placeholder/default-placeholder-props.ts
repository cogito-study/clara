import { theme } from '../../../auth/grommet';

export interface DefaultPlaceholderProps {
  startColor: string;
  endColor: string;
}

export const defaultPlaceholderProps = {
  startColor: theme.global.colors.gray_light_3,
  endColor: theme.global.colors.gray_light_4,
};
