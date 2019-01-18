import { Button } from 'rebass';
import styled from 'styled-components';
import { color } from '../styles';

export const SubscribeButton = styled(Button)`
  background-color: ${color.CogitoBlue};
  height: 50px;
  font-weight: bold;
  transition: 250ms ease-in-out;
  min-width: 250px;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(71, 135, 211, 0.2), 0px 2px 3px rgba(9, 60, 120, 0.1);

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    max-width: 620px;
    box-shadow: 0px 6px 12px rgba(71, 135, 211, 0.2), 0px 2px 3px rgba(9, 60, 120, 0.1);
  }
`;
