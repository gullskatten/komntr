import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../styleguides/Container';
import Flex from '../styleguides/Flex';
import determineColorForString from '../utils/determineColorForString';
import { TitleContext } from '../context/AppTitleContext';
import useApi from '../hooks/useApi';
import Busy from './Busy';
import { UserContext } from '../context/UserContext';
import LoginHandler from './LoginHandler';

const StyledCategoryLink = styled(({ ...props }) => <Link {...props} />)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  width: 100%;
`;

const StyledName = styled.div`
  padding: 4rem;
  background-color: ${props => props.color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  text-transform: uppercase;
`;

const StyledCreateName = styled(StyledName)`
  background-color: #000;
  border: 4px dotted #fff;
  padding: calc(4rem - 4px);
  text-transform: uppercase;
`;

const CategoriesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CategoryItem = styled(Flex)`
  @media all and (max-width: 900px) {
    flex-basis: 50%;
  }

  @media all and (max-width: 600px) {
    flex-basis: 100%;
  }
`;

export default function Categories() {
  const { dispatch } = useContext(TitleContext);
  const userContext = useContext(UserContext);

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

  return (
    <Busy busy={busy}>
      <Container gutterTop>
        <CategoriesGrid>
          <CategoryItem
            child
            basis="33%"
            gutterBottom
            alignItems="center"
            justify="center"
            fullWidth
          >
            {userContext.data.loggedIn ? (
              <StyledCategoryLink to={`/create`}>
                <StyledCreateName>Oprett kategori</StyledCreateName>
              </StyledCategoryLink>
            ) : (
              <StyledCategoryLink to="#">
                <StyledCreateName>
                  <LoginHandler />
                </StyledCreateName>
              </StyledCategoryLink>
            )}
          </CategoryItem>
          {categories.map(c => {
            return (
              <CategoryItem
                child
                basis="33%"
                gutterBottom
                key={c._id}
                alignItems="center"
                justify="center"
              >
                <StyledCategoryLink to={`/${c._id}`}>
                  <StyledName color={determineColorForString(c.name)}>
                    {c.name}
                  </StyledName>
                </StyledCategoryLink>
              </CategoryItem>
            );
          })}
        </CategoriesGrid>
      </Container>
    </Busy>
  );
}
