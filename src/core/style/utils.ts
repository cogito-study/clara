import { css } from '@emotion/core';

export const lineClamp = (numberOfLines = 2) => css`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${numberOfLines};
`;
