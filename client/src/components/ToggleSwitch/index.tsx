import React, { useRef, useState } from 'react';

import { Container } from './styles';

interface Props {
  name: string;
  onClick: Function;
  /**
   * Validation that returns true for when the switch must be checked.
   */
  checked: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const ToggleSwitch: React.FC<InputProps> = ({ name, onClick, checked }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(checked);

  function toggle(e: React.MouseEvent<HTMLInputElement>) {
    setIsChecked(!isChecked);
    onClick(e);
  }

  return (
    <Container htmlFor={name}>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="checkbox"
        onClick={toggle}
        checked={isChecked}
      />

      <span className="slider" />
    </Container>
  );
};

export default ToggleSwitch;
