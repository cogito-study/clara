import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

const LoadingAnimation = styled.div`
  border: 5px solid #fefefe;
  border-radius: 30px;
  height: 30px;
  left: 50%;
  margin: -15px 0 0 -15px;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: 30px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;

  @keyframes pulsate {
    0% {
      transform: scale(0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;

export const LoadingPage = () => (
  <Box height="100vh" background="gradient" justify="center" align="center">
    <LoadingAnimation />
  </Box>
);
