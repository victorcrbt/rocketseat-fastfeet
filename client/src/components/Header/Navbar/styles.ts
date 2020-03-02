import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { NavLink as Link } from 'react-router-dom';

export const Container = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 30px;

  ul.menu {
    list-style: none;

    .menu-item {
      display: inline;
      margin: 0 20px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-weight: bold;

  transition: color 0.2s;

  &:hover {
    color: ${props => lighten(0.05, props.theme.colors.primary)};
  }

  &.active {
    color: ${props => props.theme.colors.primary};

    &:hover {
      color: ${props => lighten(0.05, props.theme.colors.primary)};
    }
  }
`;
