import { Input } from 'rebass';
import styled from 'styled-components';
import { color } from '../styles';

export const SubscribeInput = styled(Input)`
  height: 50px;
  padding-left: 15px;
  border: 1px solid ${color.CogitoBlue};
  background-color: ${color.almostWhite};
  border-radius: 15px;
  box-shadow: 0;
  font-weight: medium;
`;
