import { Box } from 'grommet';
import React from 'react';

import { DefaultPlaceholderProps, defaultPlaceholderProps } from './DefaultPlaceholderProps';

interface LinePlaceholderProps extends DefaultPlaceholderProps {
  height: number;
  width?: string | number;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
}

export const LinePlaceholder = ({ height, width, align, startColor, endColor }: LinePlaceholderProps) => {
  return (
    <Box margin={{ vertical: 'xsmall' }} align={align}>
      <svg width={width || '100%'} height={height} fill="none">
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
        <rect width="100%" height={height} rx={6} fill="url('#gradient')" />
      </svg>
    </Box>
  );
};

LinePlaceholder.defaultProps = {
  height: 20,
  width: '100%',
  align: 'center',
  ...defaultPlaceholderProps,
};
