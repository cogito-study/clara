import React, { FunctionComponent } from 'react';
import { Image, NavLink } from 'rebass';

import logo from '../../assets/images/logo.svg';
import { color } from '../styles';

interface Props {
  onClick: () => void;
}

export const NavLogo: FunctionComponent<Props> = ({ onClick }) => (
  <NavLink color={color.white} mr="8%" onClick={onClick}>
    <Image src={logo} py={['0px', '0px', '0px', '5px']} width={['0px', '90px', '100px', '120px']} />
  </NavLink>
);