import React from 'react';
import styled from 'styled-components';
import NoResults from './NoResults';
import Comment from './Comment';
import OwnComment from './OwnComment';
import { Scrollbars } from 'react-custom-scrollbars';

const CommentsWrapper = styled.div`
  width: 100%;
  height: 70vh;
`;

const CommentPadder = styled.div`
  margin: 15px 0;
`;

const FlexReverseFlow = styled.div`
    display: flex;
    flex-flow: column-reverse;
`;

export default class Comments extends React.Component {
  state = {};
   
  componentDidUpdate = () => {
    if(this.scrollComponent) {
      this.scrollComponent.scrollToBottom();
    }
  }

  renderNoComments() {
    const { comments } = this.props;

    if (!comments || !comments.length) {
      return <NoResults label={'Ingen har kommentert her enda. 😞'} />;
    }
  }

  renderComments() {
    const { comments } = this.props;

    if (comments && comments.length) {
      return comments.map(comment => {
        return (
          <CommentPadder key={comment.id}>
          {
              comment.username === "ESGU2" ?  <OwnComment comment={comment} /> : <Comment comment={comment}/>
          }
          </CommentPadder>
        );
      });
    }
  }

  render() {
    return (
      <CommentsWrapper >
          <Scrollbars ref={c => { this.scrollComponent = c }} renderThumbVertical={
              ({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#624694', borderRadius: '5px'}}/>
            }>
              <FlexReverseFlow>
            <>{this.renderNoComments()}</>
            <>{this.renderComments()}</>
              </FlexReverseFlow>
          </Scrollbars>
      </CommentsWrapper>
    );
  }
}
