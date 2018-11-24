export const theme = {
  global: {
    colors: {
      primary: '#4787D3',
      gradient: 'linear-gradient(306.87deg, #4787D3 0%, #67BCFB 100%)',
      light: '#FBFBFB',
      dark: '#101010',
      grey: '#595959',
      lightGrey: '#9C9C9C',
    },
    font: {
      family: 'Montserrat',
    },
  },
  button: {
    border: {
      radius: '20px',
    },
    padding: {
      vertical: '14px',
      horizontal: '30px',
    },
    primary: {
      color: 'linear-gradient(103.39deg, #67BCFB -13.85%, #4787D3 113.18%)',
    },
    extend: (props) => `
      color: white;
      border: 0px;
      box-shadow: 0px 7px 15px rgba(71, 135, 211, 0.25);      
      text-transform: uppercase;
      font-weight: bold;
      transition: all 0.1s ease-in-out;      

      &:hover {
        transform: scale(1.05);     
        box-shadow: 0px 10.2643px 20.5286px rgba(71, 135, 211, 0.3);      
      }
    `,
  },
};
