import React from 'react';

import { Container, NavLink } from './styles';

const Navbar: React.FC = () => {
  return (
    <Container>
      <ul className="menu">
        <li className="menu-item">
          <NavLink to="/encomendas">ENCOMENDAS</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/entrgadores">ENTREGADORES</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/destinatarios">DESTINATÁRIOS</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/problemas">PROBLEMAS</NavLink>
        </li>
      </ul>
    </Container>
  );
};

export default Navbar;
