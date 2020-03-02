import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 30px;

  background: ${props => props.theme.colors.highlight};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);

  div.logo {
    display: flex;
    align-items: center;
    padding: 5px 30px 5px 0;

    border-right: 2px solid
      ${props => darken(0.1, props.theme.colors.highlight)};

    img {
      width: 135px;
    }
  }

  div.user {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span.user-name {
      color: ${props => props.theme.colors.text};
      font-weight: bold;
      font-size: 16px;
    }

    div.controls {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-top: 5px;

      .dark-mode-control {
        display: flex;
        align-items: center;

        svg {
          margin-left: 5px;
          fill: ${props => props.theme.colors.text};
        }
      }

      button.logout-btn {
        margin-top: 4px;

        color: ${props => props.theme.colors.error};
        font-weight: bold;
        font-size: 12px;

        background: none;
        border: 0;
        cursor: pointer;

        transition: color 0.2s;

        &:hover {
          color: ${props => lighten(0.05, props.theme.colors.error)};
        }
      }
    }
  }
`;
