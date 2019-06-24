import { Button } from 'rebass';
import styled from 'styled-components';
import { color } from '../styles';

export const SubscribeButton = styled(Button)`
  min-width: 250px;
  height: 50px;
  background-color: ${color.CogitoBlue};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(71, 135, 211, 0.2), 0px 2px 3px rgba(9, 60, 120, 0.1);
  font-weight: bold;
  transition: 250ms ease-in-out;

  &:hover {
    max-width: 620px;
    box-shadow: 0px 6px 12px rgba(71, 135, 211, 0.2), 0px 2px 3px rgba(9, 60, 120, 0.1);
    cursor: pointer;
    transform: scale(1.03);
  }
`;
