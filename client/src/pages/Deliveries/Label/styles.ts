import styled from 'styled-components';
import { darken, transparentize } from 'polished';

import { Status } from '../types';

export interface LabelProps {
  status: 'warn' | 'info' | 'success' | 'error';
}

const status = {
  ['pendente' as 'warn']: 'warn',
  ['retirada' as 'info']: 'info',
  ['entregue' as 'success']: 'success',
  ['cancelada' as 'error']: 'error',
};

export const Container = styled.span<LabelProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 15px;

  color: ${props =>
    darken(0.05, props.theme.colors[status[props.status] as Status])};
  font-weight: bold;

  background: ${props =>
    transparentize(0.8, props.theme.colors[status[props.status] as Status])};
  border-radius: 15px;

  div.circle {
    width: 10px;
    height: 10px;
    margin-right: 5px;

    font-weight: bold;

    background: ${props =>
      darken(0.05, props.theme.colors[status[props.status] as Status])};
    border-radius: 50%;
  }
`;
