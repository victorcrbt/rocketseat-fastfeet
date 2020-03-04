import React, { useRef, useEffect, useState } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);
  const [computedBg, setComputedBg] = useState<string | null>(null);

  useEffect(() => {
    if (!ref) return;

    const bg = window
      .getComputedStyle(ref.current as Element)
      .getPropertyValue('background-color');

    setComputedBg(bg);
  }, [ref]);

  return (
    <Container
      computedBg={computedBg}
      ref={ref}
      className={className}
      variation={variation}
      backgroundColor={backgroundColor}
      textColor={textColor}
      iconPosition={iconPosition}
      fillIcon={fillIcon}
      icon={!!icon}
    >
      <button type={type} {...rest}>
        {icon && iconPosition === 'left' && (
          <div className="icon left">{icon}</div>
        )}

        {children}

        {icon && iconPosition === 'right' && (
          <div className="icon right">{icon}</div>
        )}
      </button>
    </Container>
  );
};

export default Button;
