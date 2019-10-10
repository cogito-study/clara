import { Box } from 'grommet';
import React from 'react';
import { randomPercentage } from '../../utils/random-percentage';
import { DefaultPlaceholderProps, defaultPlaceholderProps } from './default-placeholder-props';

const calculateHeight = (level: number) => {
  switch (level) {
    case 1:
      return 56;
    case 2:
      return 40;
    case 3:
      return 32;
    case 4:
      return 30;
    default:
      return 0;
  }
};
interface HeadingPlaceholderProps extends DefaultPlaceholderProps {
  level: number;
  width?: number | string;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
}

export const HeadingPlaceholder = ({ level, width, align, startColor, endColor }: HeadingPlaceholderProps) => {
  return (
    <Box margin={{ vertical: 'xsmall' }} align={align}>
      <svg width={width || randomPercentage(80, 100)} height={calculateHeight(level)} fill="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={`${startColor}`}>
              <animate
                attributeName="stop-color"
                values={`${startColor}; ${endColor}; ${startColor}`}
                dur="1s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor={`${endColor}`}>
              <animate
                attributeName="stop-color"
                values={`${endColor}; ${startColor}; ${endColor}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <rect width="100%" height={calculateHeight(level)} rx={10} fill="url('#gradient')" />
      </svg>
    </Box>
  );
};

HeadingPlaceholder.defaultProps = {
  ...defaultPlaceholderProps,
};
