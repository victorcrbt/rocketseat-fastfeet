import styled, { keyframes, css } from 'styled-components';
import { Form as Unform } from '@unform/web';
import { lighten } from 'polished';

import { ReactComponent as FastfeetLogo } from '~/assets/logo.svg';
import TextInput from '~/components/Input';
import Button from '~/components/Button';

interface FormProps {
  error: boolean;
}

const loginError = keyframes`
  0% {
    transform: translateX(0);
  }

  15% {
    transform: translateX(20px);
  }

  30% {
    transform: translateX(-20px);
  }

  45% {
    transform: translateX(20px);
  }

  60% {
    transform: translateX(-20px);
  }

  100% {
    transform: translateX(0);
  }
`;

export const Container = styled.div<FormProps>`
  display: flex;
  flex-direction: column;
  padding: 30px;

  background: ${({ theme }) =>
    theme.title === 'light'
      ? theme.colors.highlight
      : lighten(0.02, theme.colors.highlight)};
  border-radius: 4px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);

  ${props =>
    props.error &&
    css`
      animation-name: ${loginError};
      animation-duration: 0.5s;
    `}
`;

export const Logo = styled(FastfeetLogo)`
  width: 260px;
  height: 44px;
  margin-bottom: 32px;

  #fastfeet {
    fill: ${props => props.theme.colors.primary};
  }
`;

export const Form = styled(Unform)`
  flex: 1;
`;

export const Input = styled(TextInput)`
  margin-bottom: 24px;
`;

export const SubmitButton = styled(Button)``;
