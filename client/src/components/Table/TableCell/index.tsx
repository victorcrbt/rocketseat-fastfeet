import React from 'react';

import { Container } from './styles';

interface Props {
  center?: boolean;
}

type TableCellProps = JSX.IntrinsicElements['td'] & Props;

const TableCell: React.FC<TableCellProps> = ({ children, center }) => {
  return <Container center={center}>{children}</Container>;
};

export default TableCell;
