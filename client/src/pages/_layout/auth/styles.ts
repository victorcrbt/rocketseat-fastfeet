import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background: ${({ theme }) =>
    theme.title === 'light' ? theme.colors.primary : theme.colors.background};

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 315px;

    img {
      width: 50px;
      margin-bottom: 40px;
    }

    a {
      margin-top: 10px;

      color: rgba(255, 255, 255, 0.6);
    }
  }
`;
