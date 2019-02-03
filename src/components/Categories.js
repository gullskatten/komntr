import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../styleguides/Container';
import determineInitials from '../utils/determineInitials';
import Flex from '../styleguides/Flex';
import determineColorForString from '../utils/determineColorForString';
import { TitleContext } from '../context/AppTitleContext';
import useApi from '../hooks/useApi';
import Busy from './Busy';

const StyledCategoryLink = styled(({ ...props }) => <Link {...props} />)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
`;

const StyledInitials = styled.div`
  padding: 4rem;
  background-color: ${props => props.color};
  color: #fff;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

const StyledName = styled.h2`
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 1.35rem;
  font-weight: bold;
`;

const CategoriesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Categories() {
  const { dispatch } = useContext(TitleContext);

  useEffect(() => {
    dispatch({
      type: 'default-title'
    });
  }, []);

  const [busy, categories] = useApi({
    endpoint: 'categories',
    fetchOnMount: true,
    initialData: []
  });
  
  console.log(categories)

  return (
    <Busy busy={busy}>
      <Container gutterTop>
        <CategoriesGrid>
          {categories.map(c => {
            return (
              <Flex
                child
                threeCol
                key={c._id}
                alignItems="center"
                justify="center"
              >
                <StyledCategoryLink to={`/${c._id}`}>
                  <StyledInitials color={determineColorForString(c.name)}>
                    {determineInitials(c.name)}
                  </StyledInitials>
                  <StyledName>{c.name}</StyledName>
                </StyledCategoryLink>
              </Flex>
            );
          })}
        </CategoriesGrid>
      </Container>
    </Busy>
  );
}
