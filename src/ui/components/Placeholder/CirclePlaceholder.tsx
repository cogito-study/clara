import { Box } from 'grommet';
import React from 'react';

import { DefaultPlaceholderProps, defaultPlaceholderProps } from './DefaultPlaceholderProps';

interface CirclePlaceholderProps extends DefaultPlaceholderProps {
  size: number;
}

export const CirclePlaceholder = ({ size, startColor, endColor }: CirclePlaceholderProps) => {
  return (
    <Box margin={{ vertical: 'xsmall' }}>
      <svg width={size} height={size} fill="none">
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
                values={`${startColor}; ${endColor}; ${startColor}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill="url('#gradient')" />
      </svg>
    </Box>
  );
};

CirclePlaceholder.defaultProps = {
  ...defaultPlaceholderProps,
};
