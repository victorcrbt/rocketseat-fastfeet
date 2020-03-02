import styled from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  computedBg?: string | null;
  variation: 'primary' | 'secondary' | 'success' | 'error' | 'warn' | 'info';
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
  icon: React.ReactNode;
  iconPosition: 'left' | 'right';
  fillIcon: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px;

  background: ${props =>
    props.backgroundColor || props.theme.colors[props.variation]};
  border-radius: 5px;
  cursor: pointer;

  transition: background 0.2s;

  &:hover {
    background: ${props => props.computedBg && darken(0.04, props.computedBg)};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 40px;

    color: ${props => props.textColor || '#fff'};
    font-weight: bold;
    font-size: 16px;

    background: transparent;
    border: 0;
  }

  .icon {
    display: none;
    align-items: center;
    justify-content: center;

    overflow: hidden;
  }

  .icon.right {
    display: ${props => props.iconPosition === 'right' && 'flex'};
    margin-left: 10px;
  }

  .icon.left {
    display: ${props => props.iconPosition === 'left' && 'flex'};
    margin-right: 10px;
  }

  svg {
    height: 20px;

    fill: ${props => props.fillIcon};
  }
`;
