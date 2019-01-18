import { colors } from './global';

export const button = {
  border: {
    radius: '10px',
    width: '1px',
  },
  padding: {
    vertical: '6px',
    horizontal: '12px',
  },
  primary: {
    color: 'gradient',
  },

  extend: (props) => {
    let extraStyles = '';
    if (props.primary) {
      extraStyles = `
        color: white;
        border: 0;
        text-transform: uppercase;
        padding: 12px 40px;
        box-shadow: 0px 7px 15px rgba(71, 135, 211, 0.25);
        font-weight: bold;

        &:hover {
          transform: scale(1.05);
          box-shadow: 0px 10px 20px rgba(71, 135, 211, 0.3);
        }
          `;
    }

    return `
      font-weight: 600;
      font-size: 16px;
      color: ${props.active ? 'white' : colors[props.colorValue]};
      text-transform: ${!props.plain && 'uppercase'};
      background-color: ${props.active && colors[props.colorValue]}
      transition: all 0.2s ease-in-out;

      ${extraStyles}
    `;
  },

  // extend: (props) => `
  //   color: ${props.primary ? 'white' : props.color};
  //   `,
};
