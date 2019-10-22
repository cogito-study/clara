import { css, Global } from '@emotion/core';
import React, { Fragment } from 'react';

export const GlobalStyles = () => (
  <Fragment>
    <Global
      styles={(theme) => css`
        * {
          @import url('https://fonts.googleapis.com/css?family=Raleway:400,500,600,700&display=swap');
          @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,600,700&display=swap');
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        button {
          font-family: ${theme.fonts.heading};
        }

        p {
          font-family: ${theme.fonts.body};
        }
      `}
    />
  </Fragment>
);
