import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { FaMoon } from 'react-icons/fa';

import AppContext from '~/AppContext';
import { ApplicationState } from '~/store';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import ToggleSwitch from '~/components/ToggleSwitch';
import Navbar from './Navbar';

import { Container } from './styles';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { toggleTheme } = useContext(AppContext);
  const theme = useTheme();

  const name: string | undefined = useSelector(
    (state: ApplicationState) => state.user.profile?.name
  );

  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="Fastfeet Logo" />
      </div>

      <Navbar />

      <div className="user">
        {/* eslint-disable-next-line */}
        <span className="user-name">Bem vindo, {name}!</span>

        <div className="controls">
          <div className="dark-mode-control">
            <ToggleSwitch
              name="dark-mode"
              onClick={toggleTheme}
              checked={theme.title === 'dark'}
            />
            <FaMoon size={14} />
          </div>

          <button
            className="logout-btn"
            type="button"
            onClick={() => dispatch(signOut())}
          >
            Sair do sistema
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Header;
