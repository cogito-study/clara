export const button = {
  border: {
    radius: '16px',
    width: '0px',
  },
  padding: {
    vertical: 'xsmall',
    horizontal: 'xsmall',
  },
  primary: {
    color: 'gradient',
  },

  extend: (props) => `
    color: ${props.primary ? 'white' : 'gray'};
    text-transform: ${!props.plain && 'uppercase'};
    padding: ${props.primary && '12px 40px'}
    box-shadow: ${props.primary ? '0px 7px 15px rgba(71, 135, 211, 0.25' : 'none'});
    font-weight: ${!props.plain && 'bold'};
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: ${props.primary && 'scale(1.05)'};
        box-shadow: 0px 10.2643px 20.5286px rgba(71, 135, 211, 0.3);
    }
    `,
};
