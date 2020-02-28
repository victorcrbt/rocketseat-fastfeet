import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, InputWrapper, TextInput } from './styles';

interface Props {
  name: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fillIcon?: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({
  name,
  icon,
  iconPosition = 'left',
  fillIcon = '#bbb',
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line object-curly-newline
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      {/*
        Couldn't find a workaround for the ref problem. When the component props is a union type of
        JSX.IntrinsicElements['input'] and the Props themselves and the element is a Styled Component,
        for some reason the ref return as a string, which TypeScript don't accept. Casting the styled
        component as any type, works fine.
      */}
      <InputWrapper
        error={error}
        icon={!!icon}
        iconPosition={iconPosition}
        fillIcon={fillIcon}
      >
        <div className="icon left">{icon}</div>
        <TextInput
          ref={inputRef}
          defaultValue={defaultValue}
          id={fieldName}
          {...rest}
        />
        <div className="icon right">{icon}</div>
      </InputWrapper>

      {error && <span className="error">{error}</span>}
    </Container>
  );
};

export default Input;
