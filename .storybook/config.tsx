import { Box, ThemeProvider } from '@chakra-ui/core';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FullCogitoLoader } from '../src/core/components/loader/cogito-loader';
import { GlobalStyles, theme } from '../src/core/style';

addDecorator(withKnobs);
addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <Suspense fallback={<FullCogitoLoader />}>
      <BrowserRouter>
        <GlobalStyles />
        <Box p={3}>{story()}</Box>
      </BrowserRouter>
    </Suspense>
  </ThemeProvider>
));

configure(require.context('../src/', true, /\.stories\.tsx$/), module);
