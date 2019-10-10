export const anchor = {
  hover: {
    textDecoration: 'none',
  },

  extend: `
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    `,
};
