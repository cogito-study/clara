import { createGlobalStyle } from 'styled-components';

import { color } from './styles';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  .dotted {
    /* Controls size of dot */
    background-image: radial-gradient(circle, rgba(68, 125, 186, 0.15) 1.5px, transparent 0px);
    background-repeat: repeat;
    background-size: 10px 10px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    height: 100%;
    width: 100%;
  }

  body,
  html {
    text-align: left;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  span {
    color: ${color.darkBlue};
  }

  .background {
    background: ${color.almostWhite};
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${color.placeholderBlue};
    opacity: 1; /* Firefox */
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-6px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  .downButton {
    transform: translatey(0px);
    animation: float 2s ease-in-out infinite;
  }

  .about {
    overflow: hidden;
  }
`;
