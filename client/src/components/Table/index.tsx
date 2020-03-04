import React from 'react';

import { Container } from './styles';

const Table: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Table;
export { default as TableRow } from './TableRow';
export { default as TableCell } from './TableCell';
