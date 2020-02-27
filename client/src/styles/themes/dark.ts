import { DefaultTheme } from 'styled-components';
import globalStyles from './global';

const dark: DefaultTheme = {
  title: 'dark',

  font: {
    ...globalStyles.font,
  },

  colors: {
    ...globalStyles.colors,
    primary: '#7D40E7',
    secondary: '#21B53D',

    background: '#444',
    highlight: '#222',
    text: '#eee',
  },
};

export default dark;
