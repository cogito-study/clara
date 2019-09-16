import { Heading, Subhead, Text } from 'rebass';
import styled from 'styled-components';

export const Paragraph = styled(Text)`
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  font-size: 16px;
  color: #093c78;
`;

export const Header1 = styled(Heading)`
  font-weight: 800;
  line-height: 1.1;
`;

export const Header2 = styled(Heading)`
  font-weight: bold;
`;

export const Header3 = styled(Subhead)`
  font-weight: 500;
`;

export const gradientText = [
  'background: -webkit-linear-gradient(60deg, #4787D3 0%, #67BCFB 70%);',
  'background: -moz-linear-gradient(60deg, #4787D3 0%, #67BCFB 100%);',
  'color: transparent;',
  'background-clip: text;',
  '-webkit-background-clip: text;',
];

export const color = {
  lightBlue: '#67BCFB',
  CogitoBlue: '#4787D3',
  darkBlue: '#093C78',
  gray: '#797979',
  white: '#FFFFFF',
  almostWhite: '#FBFDFF',
  placeholderBlue: '#B9D9FF',
  blueGradient: 'linear-gradient(101.81deg, #63B6F6 1%, #4A8CD7 136.47%)',
};
