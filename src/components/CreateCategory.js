import React, { useEffect, useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { TitleContext } from '../context/AppTitleContext';
import Flex from '../styleguides/Flex';
import useApi from '../hooks/useApi';
import Busy from './Busy';
import history from '../utils/history';

const StyledWrapper = styled(Flex)`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  padding: 0.6rem 0.8rem;
  outline: 0;
  font-size: 2.5rem;
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  border: 0;
  background-color: #111;
  color: #fff;
  outline: none;
  resize: none;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 135px;
  text-align: center;

  &::placeholder {
    color: #777;
    font-family: 'Roboto', sans-serif;
  }
`;

const HiddenButton = styled.button`
  position: absolute;
  bottom: -80px;
  width: 100%;
  border: 0;
  font-size: 1rem;
  left: 0;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  height: 80px;
  background-color: #624694;
  color: white;
  transition: all 300ms cubic-bezier(0.715, -0.135, 0.345, 1.1); /* custom */

  ${props =>
    props.active &&
    css`
      bottom: 0;
    `};
`;

export default function CreateCategory(props) {
  const { dispatch } = useContext(TitleContext);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    dispatch({
      type: 'set-title',
      data: {
        title: 'Opprett ny kategori'
      }
    });
  }, []);

  function handleOnChange(event) {
    setCategoryName(event.target.value);
  }

  // eslint-disable-next-line
  const [creating, data, error, submit] = useApi({
    endpoint: 'categories',
    method: 'POST',
    body: {
      name: categoryName
    },
    onSuccess: response => {
      history.push(`/${response._id}`);
    }
  });

  return (
    <Busy busy={creating}>
      <StyledWrapper direction="column">
        <form
          onSubmit={e => {
            e.preventDefault();

            if (categoryName !== '') {
              submit();
            }
          }}
        >
          <StyledInput
            value={categoryName}
            placeholder="Navn på kategori..."
            onChange={handleOnChange}
            disabled={creating}
          />
          <HiddenButton
            disabled={creating}
            active={categoryName.length > 0}
            type="submit"
          >
            Lagre
          </HiddenButton>
        </form>
      </StyledWrapper>
    </Busy>
  );
}
