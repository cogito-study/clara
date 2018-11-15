import React, { FunctionComponent } from 'react';
import { Toolbar as RebassToolbar } from 'rebass';
import styled from 'styled-components';

export const Toolbar = styled(RebassToolbar)`
  box-shadow: 0 14px 30px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.03);
  background-color: #4787d3;
`;

export const NavToolbar: FunctionComponent = ({ children }) => (
  <Toolbar
    alignItems="center"
    justifyContent={['flex-start', 'center']}
    py={['0px', '0px', '0px', '0px']}
    css={{
      overflowX: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }}
  >
    {children}
  </Toolbar>
);
