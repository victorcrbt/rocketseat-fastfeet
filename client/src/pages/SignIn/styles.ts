import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import { lighten } from 'polished';

import { ReactComponent as FastfeetLogo } from '~/assets/logo.svg';
import TextInput from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  background: ${({ theme }) =>
    theme.title === 'light'
      ? theme.colors.highlight
      : lighten(0.02, theme.colors.highlight)};
  border-radius: 4px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
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
