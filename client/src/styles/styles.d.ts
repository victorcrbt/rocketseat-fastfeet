import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    font: {
      family: string;
    }

    colors: {
      primary: string;
      secondary: string;
      highlight: string;

      success: string;
      error: string;
      warn: string;
      info: string;

      background: string;
      text: string;
    }
  }
}
