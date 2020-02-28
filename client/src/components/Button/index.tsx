import React from 'react';

import { Container } from './styles';

interface Props {
  type: 'button' | 'submit' | 'reset';
  variation?: 'primary' | 'secondary' | 'success' | 'error' | 'warn' | 'info';
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fillIcon?: string;
}

type ButtonProps = JSX.IntrinsicElements['button'] & Props;

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  variation = 'primary',
  backgroundColor,
  textColor,
  iconPosition = 'left',
  fillIcon = '#fff',
  icon,
  className,
  ...rest
}) => {
  return (
    <Container
      className={className}
      variation={variation}
      backgroundColor={backgroundColor}
      textColor={textColor}
      iconPosition={iconPosition}
      fillIcon={fillIcon}
      icon={!!icon}
    >
      {icon && iconPosition === 'left' && (
        <div className="icon left">{icon}</div>
      )}

      <button type={type} {...rest}>
        {children}
      </button>

      {icon && iconPosition === 'right' && (
        <div className="icon right">{icon}</div>
      )}
    </Container>
  );
};

export default Button;
