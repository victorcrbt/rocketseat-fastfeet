import React, { useRef, useEffect } from 'react';
import {
  OptionTypeBase,
  Props as ReactSelectProps,
  ValueType,
} from 'react-select';
import { useField } from '@unform/core';
import { AsyncProps } from 'react-select/async';
import { DefaultTheme } from 'styled-components';

import { Container, Select as ReactSelect } from './styles';

interface Props {
  name: string;
  /**
   * Async function that return a set of options to be rendered
   * by the select component.
   */
  loadOptions(inputValue: string): Promise<OptionTypeBase[]>;
  getOptionLabel?(options: OptionTypeBase): string;
  getOptionValue?(options: OptionTypeBase): string;
  label: string;
}

type SelectProps = ReactSelectProps<any> &
  AsyncProps<any> &
  Props & { theme?: DefaultTheme };

const Select: React.FC<SelectProps> = ({
  loadOptions,
  label,
  name,
  ...rest
}) => {
  const selectRef: any = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue(ref: any) {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value
          );
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti, selectRef]);

  return (
    <Container>
      {label && <label htmlFor={name}>{name}</label>}

      <ReactSelect
        id={name}
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        defaultOptions
        loadOptions={loadOptions}
        ref={selectRef}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </Container>
  );
};

export default Select;
