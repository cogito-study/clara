import { Card } from 'rebass';
import styled from 'styled-components';
import { color } from '../styles';

export const ContactCard = styled(Card)`
  border-radius: 20px;
  box-shadow: 0 7px 15px 0 rgba(71, 135, 211, 0.25);
  @media (max-width: 1023px) {
    box-shadow: none;
    width: 100%;
    background: ${color.almostWhite};
    border-radius: 0px;
  }
`;
