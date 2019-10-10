import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';
import React, { Fragment } from 'react';

addDecorator(withKnobs);
addDecorator((story) => (
  <ThemeProvider>
    <CSSReset />
    <Box p={3}>{story()}</Box>
  </ThemeProvider>
));

configure(require.context('../src/', true, /\.stories\.tsx$/), module);
