import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 5px;

  h1.page-title {
    color: ${props => props.theme.colors.text};
    font-size: 24px;
  }

  div.controls {
    display: flex;
    justify-content: space-between;
  }

  div.deliveries {
    width: 100%;
  }
`;

export const SearchInput = styled(Input)`
  width: 240px;
`;

export const AddButton = styled(Button)`
  width: 120px;
  height: 36px;
`;

export const ActionsButton = styled(MdMoreHoriz).attrs(props => ({
  size: 24,
  color: props.theme.colors.text,
}))`
  cursor: pointer;
`;
