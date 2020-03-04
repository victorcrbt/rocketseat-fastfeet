import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;

  border-collapse: separate;
  border-spacing: 0 20px;

  thead {
    tr {
      td {
        padding: 0 15px;

        color: ${props => props.theme.colors.text};
        font-weight: bold;
        font-size: 16px;
      }
    }
  }

  tbody {
    tr {
      color: ${props => props.theme.colors.text};

      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);

      td {
        position: relative;

        padding: 18px;

        background: ${props => props.theme.colors.highlight};

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
  }
`;
