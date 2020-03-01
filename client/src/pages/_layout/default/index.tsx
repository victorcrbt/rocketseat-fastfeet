import React from 'react';

import { Container, Content } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default DefaultLayout;
