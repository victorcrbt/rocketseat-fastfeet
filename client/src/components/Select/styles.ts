import styled from 'styled-components';
import ReactSelect from 'react-select/async';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 5px;
`;

export const Select = styled(ReactSelect)`
  .css-1pahdxg-control,
  .css-yk16xz-control,
  .react-select__control--is-focused {
    border-color: ${props =>
      props.error
        ? darken(0.2, props.theme.colors.error)
        : darken(0.3, props.theme.colors.highlight)};
    box-shadow: none !important;

    &:hover {
      border-color: ${props =>
        props.error
          ? darken(0.2, props.theme.colors.error)
          : darken(0.3, props.theme.colors.highlight)};
      box-shadow: none !important;
    }
  }

  .react-select__control,
  .react-select__menu,
  .react-select__option {
    background: ${props => props.theme.colors.highlight};
    border: 1px solid
      ${props =>
        props.error
          ? darken(0.2, props.theme.colors.error)
          : darken(0.3, props.theme.colors.highlight)};
    cursor: pointer;
  }

  .react-select__option {
    color: ${props => props.theme.colors.text};

    border: 0;

    &:hover {
      background: ${props =>
        props.theme.title === 'light'
          ? darken(0.07, props.theme.colors.highlight)
          : lighten(0.02, props.theme.colors.highlight)};
    }
  }

  .react-select__placeholder,
  .react-select__single-value {
    color: ${props => props.theme.colors.text};
  }
`;
