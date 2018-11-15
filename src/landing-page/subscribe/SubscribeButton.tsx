import { Button } from 'rebass';
import styled from 'styled-components';
import { color } from '../styles';

export const SubscribeButton = styled(Button)`
  width: 80%;
  background-color: ${color.CogitoBlue};
  height: 50px;
  font-weight: bold;
  transition: 250ms ease-in-out;
  max-width: 600px;
  min-width: 300px;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    max-width: 620px;
    box-shadow: 0px 7px 15px rgba(71, 135, 211, 0.25);
  }
`;
