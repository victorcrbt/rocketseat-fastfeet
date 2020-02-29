import styled from 'styled-components';

interface ContainerProps {
  error: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div.preview {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 100px;

    overflow: hidden;

    border: 2px dashed
      ${props => (props.error ? props.theme.colors.error : '#ccc')};
    border-radius: 50%;

    img {
      width: 100px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      color: #aaa;
      font-size: 12px;
    }
  }

  input[type='file'] {
    display: none;
  }

  span.error {
    margin-top: 5px;

    color: ${props => props.theme.colors.error};
    font-weight: bold;
  }
`;
