import React from 'react';

import { Container } from './styles';

const Tooltip: React.FC<JSX.IntrinsicElements['div']> = ({ children }) => {
  return (
    <Container>
      <div className="tip" />
      {children}
    </Container>
  );
};

export default Tooltip;
