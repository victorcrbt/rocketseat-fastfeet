import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface InputWrapperProps {
  error: string;
  icon: boolean;
  iconPosition: 'left' | 'right';
  fillIcon: string;
}

interface InputProps {
  inputHeight?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 5px;

  label {
    margin-bottom: 5px;

    color: ${props => props.theme.colors.text};
    font-weight: bold;
  }

  .error {
    margin: 3px 0 0 3px;

    color: ${props => props.theme.colors.error};
    font-weight: bold;
  }
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  height: 100%;

  background: ${props => props.theme.colors.highlight};
  border: 1px solid
    ${props =>
      props.error
        ? darken(0.2, props.theme.colors.error)
        : darken(0.2, props.theme.colors.highlight)};
  border-radius: 4px;

  ${props =>
    props.icon &&
    css`
      .icon {
        display: none;
        align-items: center;
        justify-content: center;
        max-height: 40px;

        overflow: hidden;
      }

      .icon.right {
        display: ${props.iconPosition === 'right' && 'flex'};
        margin-right: 10px;
      }

      .icon.left {
        display: ${props.iconPosition === 'left' && 'flex'};
        margin-left: 10px;
      }
    `}

  .icon svg {
    height: 20px;

    fill: ${props => props.fillIcon};
  }
`;

export const TextInput = styled.input<InputProps>`
  flex: 1;
  min-height: ${props => props.inputHeight || '40px'};
  padding: 0 10px;

  color: ${props => props.theme.colors.text};

  background: transparent;
  border: 0;

  &::placeholder {
    color: ${props => props.theme.colors.text};
  }
` as any;
