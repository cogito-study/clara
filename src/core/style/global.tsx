import { CSSReset } from '@chakra-ui/core';
import { css, Global } from '@emotion/core';
import React, { Fragment } from 'react';

export const GlobalStyles = () => (
  <Fragment>
    <CSSReset />
    <Global
      styles={(theme) => css`
        :focus {
          outline: none;
        }
        ::-moz-focus-inner {
          border: 0;
        }

        * {
          @import url('https://fonts.googleapis.com/css?family=Raleway:400,500,600,700&display=swap');
          @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,600,700&display=swap');
        }

        header,
        h1,
        h2,
        h3,
        h4,
        h5,
        label,
        button {
          font-family: ${theme.fonts.heading};
        }

        p,
        div {
          font-family: ${theme.fonts.body};
        }

        input,
        textarea {
          -webkit-appearance: none;
        }
      `}
    />
  </Fragment>
);
