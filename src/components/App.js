import React, { Component } from 'react';
import Comments from './Comments';
import styled from 'styled-components';
import initialComments from '../data/sample_comments';
import PostComment from './PostComment';

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AppTitleWrapper = styled.nav`
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  z-index: 1;
  position: sticky;
  padding: 1rem 0;
  box-shadow: 0px 7px 10px 1px rgb(0,0,0,0.4);
  border-bottom: 5px solid #624694;
`;

const Container = styled.div`
  max-width: 1500px;
  width: 100%;
  `;

const ContainerWithShadow = styled(Container)`
  box-shadow: 0 -10px 10px -5px rgba(0,0,0,0.3);
`;
const AppTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
  margin: 0;
  padding: 0;
  
  @media all and (max-width: 450px) {
    font-size: 1.8rem;
  }
`;
const CenteredWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled(CenteredWrapper)`
  flex-basis: 7%;
  
`

const AllComments = styled(CenteredWrapper)`
  flex-basis: auto;

`

const NewComment = styled(CenteredWrapper)`
  flex-basis: 5%;
  z-index: 1;

  @media all and (max-width: 650px) {
    flex-basis: 10%;
  }
`

class App extends Component {
  state = {
    comments: initialComments
  }
  postNewComment = commentText => {
    const { comments } = this.state;

    const newComment = {
      id: Math.floor(Math.random() * 13337), 
      comment: commentText,
      username: 'ESGU2',
      created: new Date(),
      createdBy: 'Espen Gudmundsen',
    }

    this.setState({
      comments: [newComment, ...comments]
    })
  }

  render() {

    const { comments } = this.state;

    return (
      <Content>
        <Title>
          <Container>
            <AppTitleWrapper>
              <AppTitle>KOMNTR <span role="img" aria-label="logo">😼</span></AppTitle>
            </AppTitleWrapper>
          </Container>
        </Title>
        <AllComments>
          <Container>
            <Comments comments={comments} />   
          </Container>
        </AllComments>
        <NewComment>
          <ContainerWithShadow>
            <PostComment handlePostComment={commentText => this.postNewComment(commentText)}/> 
          </ContainerWithShadow>
        </NewComment>
      </Content>
    );
  }
}

export default App;
