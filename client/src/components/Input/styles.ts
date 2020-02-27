import styled from 'styled-components';
import { darken } from 'polished';

interface InputProps {
  error: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 5px;

  label {
    margin-left: 3px;

    color: #333;
    font-weight: bold;
  }

  .error {
    margin-left: 3px;

    color: ${props => darken(0.2, props.theme.colors.error)};
    font-weight: bold;
  }
`;

export const TextInput = styled.input<InputProps>`
  height: 40px;
  padding: 0 10px;

  border: 1px solid
    ${props => (props.error ? darken(0.2, props.theme.colors.error) : '#ccc')};
  border-radius: 4px;
` as any;
