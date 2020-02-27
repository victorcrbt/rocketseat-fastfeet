import { DefaultTheme } from 'styled-components';
import globalStyles from './global';

const light: DefaultTheme = {
  title: 'light',

  font: {
    ...globalStyles.font,
  },

  colors: {
    ...globalStyles.colors,
    primary: '#7D40E7',
    secondary: '#21B53D',

    background: '#F5F5F5',
    highlight: '#fff',
    text: '#333',
  },
};

export default light;
