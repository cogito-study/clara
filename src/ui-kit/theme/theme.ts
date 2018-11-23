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
      vertical: '12px',
      horizontal: '24px',
    },
    primary: {
      color: 'linear-gradient(306.87deg, #4787D3 0%, #67BCFB 100%)',
    },
    extend: (props) => `
      color: white;
      border: 0px;
      text-transform: uppercase;
      font-weight: 600;
    `,
  },
};
