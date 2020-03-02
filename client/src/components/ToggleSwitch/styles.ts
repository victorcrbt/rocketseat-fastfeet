import styled from 'styled-components';

// interface ContainerProps {
//   onClick: Function;
// }

export const Container = styled.label`
  position: relative;

  display: inline-block;
  width: 30px;
  height: 16px;

  .slider {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: #aaa;
    border-radius: 4px;
    cursor: pointer;

    &:before {
      position: absolute;
      bottom: 3px;
      left: 3px;

      width: 10px;
      height: 10px;

      background-color: white;
      border-radius: 2px;

      transition: 0.2s;

      content: '';
    }
  }

  input {
    display: none;

    &:checked + .slider {
      background: ${props => props.theme.colors.primary};
    }

    &:checked + .slider:before {
      transform: translateX(14px);
    }
  }
`;
