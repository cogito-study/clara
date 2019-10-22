import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { theme, GlobalStyles } from '../src/core/style';

addDecorator(withKnobs);
addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CSSReset />
      <GlobalStyles />
      <Box p={3}>{story()}</Box>
    </BrowserRouter>
  </ThemeProvider>
));

configure(require.context('../src/', true, /\.stories\.tsx$/), module);
