import React from 'react';

import { Status } from '../types';

import { Container } from './styles';

interface Props {
  status: Status;
  content: React.ReactNode;
}

type LabelProps = JSX.IntrinsicElements['span'] & Props;

const Label: React.FC<LabelProps> = ({ content, status }) => {
  return (
    <Container status={status}>
      <div className="circle" />

      {content}
    </Container>
  );
};

export default Label;
