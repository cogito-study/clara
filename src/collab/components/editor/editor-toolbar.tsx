import { Flex } from '@chakra-ui/core';
import css from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';

/* stylelint-disable */

const SizeSelect = styled.select`
  border: 1px solid white !important;

  &:hover {
    border: 1px solid lightblue !important;
  }

  & > span::before {
    color: white !important;
  }

  & > span > svg > polygon {
    stroke: white !important;
  }

  &:hover > span > svg > polygon {
    stroke: lightblue !important;
  }
`;

const ToolBarButtonBase = css`
  border: 1px solid white !important;

  &:hover {
    border: 1px solid lightblue !important;
  }

  margin-right: 10px;
`;

const BoldButton = styled.button`
  ${ToolBarButtonBase}

  & > svg > path {
    stroke: white !important;
  }
  &:hover > svg > path {
    stroke: lightblue !important;
  }
`;

const ItalicButton = styled.button`
  ${ToolBarButtonBase}

  & > svg > line {
    stroke: white !important;
  }
  &:hover > svg > line {
    stroke: lightblue !important;
  }
`;

const UnderlineButton = styled.button`
  ${ToolBarButtonBase}

  & > svg > path {
    stroke: white !important;
  }
  &:hover > svg > path {
    stroke: lightblue !important;
  }

  & > svg > rect {
    fill: white !important;
  }
  &:hover > svg > rect {
    fill: lightblue !important;
  }
`;

const ImageButton = styled.button`
  ${ToolBarButtonBase}

  & > svg > rect {
    stroke: white !important;
  }
  &:hover > svg > rect {
    stroke: lightblue !important;
  }

  & > svg > circle {
    fill: white !important;
  }
  &:hover > svg > circle {
    fill: lightblue !important;
  }

  & > svg > polyline {
    fill: white !important;
  }
  &:hover > svg > polyline {
    fill: lightblue !important;
  }
`;

const OrderedButton = styled.button`
  ${ToolBarButtonBase}

  & > svg > line {
    stroke: white !important;
  }
  &:hover > svg > line {
    stroke: lightblue !important;
  }

  & > svg > path.ql-fill {
    fill: white !important;
  }
  &:hover > svg > path.ql-fill {
    fill: lightblue !important;
  }

  & > svg > path.ql-stroke {
    stroke: white !important;
  }
  &:hover > svg > path.ql-stroke {
    stroke: lightblue !important;
  }
`;

const BulletButton = styled.button`
  ${ToolBarButtonBase}

  & > svg > line {
    stroke: white !important;
  }
  &:hover > svg > line {
    stroke: lightblue !important;
  }

  & > svg > path.ql-fill {
    fill: white !important;
  }
  &:hover > svg > path.ql-fill {
    fill: lightblue !important;
  }

  & > svg > path.ql-stroke {
    stroke: white !important;
  }
  &:hover > svg > path.ql-stroke {
    stroke: lightblue !important;
  }
`;

const LinkButton = styled.button`
  ${ToolBarButtonBase}

  & > svg > line {
    stroke: white !important;
  }
  &:hover > svg > line {
    stroke: lightblue !important;
  }

  & > svg > path.ql-fill {
    fill: white !important;
  }
  &:hover > svg > path.ql-fill {
    fill: lightblue !important;
  }

  & > svg > path.ql-stroke {
    stroke: white !important;
  }
  &:hover > svg > path.ql-stroke {
    stroke: lightblue !important;
  }
`;

/* stylelint-enable */

export const EditorToolbar = () => {
  // const { colors } = useTheme();

  return (
    <Flex alignItems="center">
      <div id="toolbar" style={{ border: 'none' }}>
        <span className="ql-formats">
          <SizeSelect className="ql-size"></SizeSelect>
        </span>
        <span className="ql-formats">
          <BoldButton className="ql-bold"></BoldButton>
          <ItalicButton className="ql-italic"></ItalicButton>
          <UnderlineButton className="ql-underline"></UnderlineButton>
        </span>
        <span className="ql-formats">
          <OrderedButton className="ql-list" value="ordered"></OrderedButton>
          <BulletButton className="ql-list" value="bullet"></BulletButton>
          <ImageButton className="ql-image"></ImageButton>
          <LinkButton className="ql-link"></LinkButton>
        </span>
      </div>
    </Flex>
  );
};
