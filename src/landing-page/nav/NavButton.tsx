import React, { FunctionComponent } from 'react';
import { Button } from 'rebass';

import { color } from '../styles';

interface Props {
  onClick: () => void;
}

export const NavButton: FunctionComponent<Props> = ({ onClick, children }) => (
  <Button
    onClick={onClick}
    ml={50}
    color={color.white}
    fontSize={14}
    borderRadius={0}
    bg={'rgba(0, 0, 0, 0.0)'}
    fontWeight={'600'}
    css={{
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        color: color.white,
        transition: 'all 0.2s ease-in-out',
        fontWeight: '800',
      },
    }}
  >
    {children}
  </Button>
);
