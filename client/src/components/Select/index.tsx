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
  loadOptions(inputValue: string): Promise<OptionTypeBase[]>;
  getOptionLabel?(options: OptionTypeBase): string;
  getOptionValue?(options: OptionTypeBase): string;
}

type SelectProps = ReactSelectProps<any> &
  AsyncProps<any> &
  Props & { theme?: DefaultTheme };

const Select: React.FC<SelectProps> = ({ loadOptions, name, ...rest }) => {
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
      <ReactSelect
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        defaultOptions
        loadOptions={loadOptions}
        ref={selectRef}
        {...rest}
      />
    </Container>
  );
};

export default Select;
