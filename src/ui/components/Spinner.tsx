import styled from 'styled-components';

export const Spinner = styled.div<{ primary?: boolean }>`
  width: 30px;
  height: 30px;
  border: 5px solid ${(props) => (props.primary ? props.theme.global.colors.primary : props.theme.global.colors.light)};
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  border-radius: 30px;
  opacity: 0;

  @keyframes pulsate {
    0% {
      opacity: 0;
      transform: scale(0.1);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
`;
