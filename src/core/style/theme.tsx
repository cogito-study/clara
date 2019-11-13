import { theme as baseTheme } from '@chakra-ui/core';
import React from 'react';

export const theme = {
  ...baseTheme,
  fonts: {
    heading: `"Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  },
  breakpoints: ['432px', '576px', '900px', '1200px'],
  fontSizes: {
    xs: '10px',
    sm: '16px',
    md: '18px',
    lg: '26px',
    xl: '34px',
    '2xl': '44px',
  },
  lineHeights: {
    shorter: '0.8',
    none: '1',
    normal: '1.2',
    base: '1.2',
    tall: '1.5',
    taller: '1.625',
  },
  colors: {
    ...baseTheme.colors,
    white: '#FAFAFA',
    black: '#050505',
    blue: {
      50: '#ebf8ff',
      100: '#CCE1FF',
      200: '#99C4FF',
      300: '#66A6FF',
      400: '#3388FF',
      500: '#006AFF',
      600: '#0055CC',
      700: '#004099',
      800: '#002B66',
      900: '#001533',
    },
    teal: {
      50: '#E6FFFA',
      100: '#CCFFF6',
      200: '#99FFEE',
      300: '#66FFE5',
      400: '#33FFDD',
      500: '#00EBC3',
      600: '#00CCAA',
      700: '#00997F',
      800: '#006655',
      900: '#00332A',
    },
    grey: {
      50: '#F7FAFC',
      100: '#E5E5E5',
      200: '#CCCCCC',
      300: '#B3B3B3',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4D4D4D',
      800: '#333333',
      900: '#1A1A1A',
    },
    green: {
      50: '#f0fff4',
      100: '#DAF7D4',
      200: '#B4F0A8',
      300: '#8FE87D',
      400: '#69E052',
      500: '#44D926',
      600: '#36AD1F',
      700: '#298217',
      800: '#1B570F',
      900: '#0E2B08',
    },
    orange: {
      50: '#FFFAF0',
      100: '#FFE5CC',
      200: '#FFCC99',
      300: '#FFB266',
      400: '#FF9933',
      500: '#FF8000',
      600: '#CC6600',
      700: '#994D00',
      800: '#663300',
      900: '#331A00',
    },
    red: {
      50: '#fff5f5',
      100: '#FFCCCC',
      200: '#FF9999',
      300: '#FF6666',
      400: '#FF3333',
      500: '#FF0000',
      600: '#CC0000',
      700: '#990000',
      800: '#660000',
      900: '#330000',
    },
  },
  icons: {
    ...baseTheme.icons,
    cogito: {
      path: (
        <g fill="currentColor">
          <path d="M17.1301 30.2621C9.26006 30.2621 2.85718 23.858 2.85718 15.9862C2.85718 8.11666 9.26006 1.71429 17.1301 1.71429C21.6752 1.71429 25.9891 3.91049 28.6701 7.58901L28.7216 7.65972L27.4329 8.59549L27.3854 8.5255C25.0031 5.25653 21.1694 3.30504 17.1301 3.30504C10.1374 3.30504 4.44844 8.99374 4.44844 15.9861C4.44844 22.9807 10.1374 28.6711 17.1301 28.6711C20.4935 28.6711 23.6676 27.3635 26.068 24.9892C26.5158 24.5182 26.7624 23.9007 26.7624 23.2505C26.7624 21.8553 25.6278 20.7203 24.2332 20.7203C23.5949 20.7203 22.985 20.9603 22.5159 21.3962C21.084 22.8082 19.1845 23.5859 17.1674 23.5859C12.9592 23.5859 9.5356 20.162 9.5356 15.9533C9.5356 11.7446 12.9592 8.32056 17.1674 8.32056C19.351 8.32056 21.4324 9.25715 22.8778 10.8902C23.0408 11.0704 23.2743 11.1738 23.5184 11.1738C23.9933 11.1738 24.3796 10.7862 24.3796 10.3097C24.3796 10.0995 24.3025 9.89672 24.1627 9.73875C22.3882 7.74163 19.8386 6.59631 17.1674 6.59631C12.009 6.59631 7.81237 10.7938 7.81237 15.9532C7.81237 21.1111 12.009 25.3073 17.1674 25.3073C19.4602 25.3073 21.6655 24.4703 23.377 22.9506C23.3994 22.9315 23.7676 22.5712 23.7676 22.5712L24.8361 23.753C24.8361 23.753 24.4735 24.1026 24.4432 24.1299C22.4385 25.9145 19.8546 26.8972 17.1674 26.8972C11.1323 26.8972 6.22244 21.9877 6.22244 15.9532C6.22244 9.9182 11.1323 5.00823 17.1674 5.00823C20.2923 5.00823 23.2749 6.34718 25.3499 8.68182C25.7499 9.13002 25.9701 9.70813 25.9701 10.3096C25.9701 11.6622 24.8703 12.7626 23.5185 12.7626C22.8193 12.7626 22.151 12.4634 21.6853 11.9418L21.6758 11.9311C20.5304 10.6453 18.8875 9.90936 17.1674 9.90936C13.8361 9.90936 11.126 12.6207 11.126 15.9532C11.126 19.2845 13.8361 21.9947 17.1674 21.9947C18.7684 21.9947 20.2743 21.3769 21.4078 20.2551L21.4287 20.237C22.1901 19.524 23.1862 19.1312 24.2332 19.1312C26.5037 19.1312 28.3509 20.979 28.3509 23.2504C28.3509 24.3149 27.9467 25.3237 27.2128 26.0909L27.201 26.1073C24.4926 28.7883 20.9179 30.2621 17.1301 30.2621Z" />
        </g>
      ),
      viewBox: '0 0 32 32',
    },
  },
};

export type Theme = typeof theme;
