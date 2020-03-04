import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  left: 50%;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 10px;

  color: ${props => props.theme.colors.text};

  background: ${props => props.theme.colors.highlight};
  border: 1px solid
    ${props => (props.theme.title === 'light' ? '#ccc' : '#444')};
  border-radius: 4px;
  transform: translateX(-50%);

  &:before {
    position: absolute;
    top: -8px;
    left: 50%;

    width: 0;
    height: 0;

    border-right: 8px solid transparent;
    border-bottom: 8px solid
      ${props => (props.theme.title === 'light' ? '#ccc' : '#444')};
    border-left: 8px solid transparent;

    transform: translateX(-50%);

    content: '';
  }

  &:after {
    position: absolute;
    top: -7px;
    left: 50%;

    width: 0;
    height: 0;

    border-right: 7px solid transparent;
    border-bottom: 7px solid ${props => props.theme.colors.highlight};
    border-left: 7px solid transparent;

    transform: translateX(-50%);

    content: '';
  }
`;
