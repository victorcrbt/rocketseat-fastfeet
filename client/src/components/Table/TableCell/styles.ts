import styled, { css } from 'styled-components';

interface ContainerProps {
  center?: boolean;
}

export const Container = styled.td<ContainerProps>`
  ${props =>
    props.center &&
    css`
      text-align: center;
    `}
`;
