import React, { FunctionComponent } from 'react';
import { NavLink as RebassNavLink } from 'rebass';

import { color } from '../styles';

interface Props {
  onClick: () => void;
}

export const NavLink: FunctionComponent<Props> = ({ onClick, children }) => (
  <RebassNavLink
    onClick={onClick}
    mx={'2%'}
    fontWeight={500}
    fontSize="14px"
    color={color.almostWhite}
    css={{
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        color: color.white,
        transition: 'all 0.2s ease-in-out',
        borderBottom: '3px solid white',
      },
    }}
  >
    {children}
  </RebassNavLink>
);
