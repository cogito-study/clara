import React from 'react';
import { Image } from 'rebass';

export const SocialImage = ({ src }) => (
  <Image
    css={{
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transition: 'all 0.2s ease-in-out',
        transform: 'scale(1.1)',
      },
    }}
    src={src}
  />
);
