export const checkBox = {
  border: {
    color: {
      light: 'primary',
    },
  },
  color: {
    light: 'primary',
  },
  check: {
    extend: ({ _, checked }) => `
        ${checked && `background-color: 'primary';`}
      `,
  },
  hover: {
    border: {
      color: undefined,
    },
  },
};
