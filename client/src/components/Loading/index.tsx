import React from 'react';

import { Icon } from './styles';

interface Props {
  color?: string;
  size?: number;
}

const Loading: React.FC<Props> = ({ color, size }) => {
  return <Icon size={size} color={color} />;
};

export default Loading;
