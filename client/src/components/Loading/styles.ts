import styled from 'styled-components';

import { ReactComponent as Loading } from '~/assets/loading.svg';

interface IconProps {
  color?: string;
  size?: number;
}

export const Icon = styled(Loading)<IconProps>`
  width: ${props => `${props.size}px` || '36px'};
  height: ${props => `${props.size}px` || '36px'};

  rect {
    fill: ${props => props.color};
  }
`;
