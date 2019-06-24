import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(RouterLink)`
  color: ${(props) => props.theme.global.colors.primary};
  text-decoration: none;

  :visited {
    color: ${(props) => props.theme.global.colors.primary};
    color: 'primary';
  }
`;
