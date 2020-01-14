import { CSSProperties } from 'react';

export const lineClamp = (lines = 3): CSSProperties => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
  WebkitLineClamp: lines,
});
