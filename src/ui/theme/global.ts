export const colors = {
  primary: '#4787D3',
  gradient: 'linear-gradient(306.87deg, #4787D3 0%, #67BCFB 100%)',
  horizontalGradient: 'linear-gradient(270deg, #4787D3 13.05%, #67BCFB 86.95%);',
  light: '#FBFBFB',
  dark: '#101010',
  grey: '#595959',
  backgroundBlue: '#DDE6ED',
  nightBlue: '#093C78',
  lightGrey: '#9C9C9C',
  success: '#24EE81',
  error: '#FF2B5E',
  info: 'primary',
  transparent: 'rgba(0, 0, 0, 0.0);',
};

export const control = {
  border: {
    radius: '24px',
  },
};

export const font = {
  family: 'Montserrat',
  size: '16px',
};

const baseSpacing = 24;

export const breakpoints = {
  small: {
    value: baseSpacing * 32, // 768
    borderSize: {
      xsmall: '1px',
      small: '2px',
      medium: `${baseSpacing / 6}px`, // 4
      large: `${baseSpacing / 4}px`, // 6
      xlarge: `${baseSpacing / 2}px`, // 12
    },
    edgeSize: {
      none: '0px',
      hair: '1px', // for Chart
      xxsmall: '2px',
      xsmall: `${baseSpacing / 8}px`, // 3
      small: `${baseSpacing / 4}px`, // 6
      medium: `${baseSpacing / 2}px`, // 12
      large: `${baseSpacing}px`, // 24
      xlarge: `${baseSpacing * 2}px`, // 48
    },
    size: {
      xxsmall: `${baseSpacing}px`, // 24
      xsmall: `${baseSpacing * 2}px`, // 48
      small: `${baseSpacing * 4}px`, // 96
      medium: `${baseSpacing * 8}px`, // 192
      large: `${baseSpacing * 16}px`, // 384
      xlarge: `${baseSpacing * 32}px`, // 768
      full: '100%',
    },
  },
  medium: {
    value: baseSpacing * 64, // 1536
  },
  large: {}, // anything above 'medium'
};

export const deviceBreakpoints = {
  phone: 'small',
  tablet: 'medium',
  computer: 'large',
};
