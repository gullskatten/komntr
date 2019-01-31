import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import sample_comments from '../data/sample_comments';
import NoResults from './NoResults';
import PostComment from './PostComment';
import Comment from './Comment';
import OwnComment from './OwnComment';
import Container from '../styleguides/Container';
import Flex from '../styleguides/Flex';

const CommentsWrapper = styled.div`
  width: 100%;
  height: 70vh;
`;

const CommentPadder = styled.div`
  margin: 15px 0;
`;

const NewComment = styled(Flex)`
  position: fixed;
  bottom: 5px;
  width: 100%;

  @media all and (max-width: 650px) {
    flex-basis: 10%;
  }
`;

export default function _Comments(props) {
  const {
    match: {
      params: { postId }
    }
  } = props;
  const currentComments = sample_comments.filter(f => f.postId === postId);
  const [comments, setComments] = useState(currentComments);
  const scrollRef = useRef(null);

  function postNewComment(commentText) {
    if (commentText === '') {
      return;
    }

    const newComment = {
      id: Math.floor(Math.random() * 13337),
      comment: commentText,
      username: 'ESGU2',
      created: new Date(),
      createdBy: 'Espen Gudmundsen'
    };

    setComments([newComment, ...comments]);
  }

  useEffect(
    () => {
      if (scrollRef.current) {
        scrollRef.current.scrollToBottom();
      }
    },
    [scrollRef.current, comments.length]
  );

  return (
    <>
      <Flex
        justify="center"
        alignItems="center"
        direction="column"
        basis="auto"
      >
        <Container>
          <CommentsWrapper>
            <Scrollbars
              ref={c => {
                scrollRef.current = c;
              }}
              renderThumbVertical={({ style, ...props }) => (
                <div
                  {...props}
                  style={{
                    ...style,
                    backgroundColor: '#624694',
                    borderRadius: '5px'
                  }}
                />
              )}
            >
              <Flex flexFlow="column-reverse">
                {!comments || comments.length === 0 ? (
                  <NoResults label={'Ingen har kommentert her enda. 😞'} />
                ) : (
                  <>
                    {comments.map(comment => {
                      return (
                        <CommentPadder key={comment.id}>
                          {comment.username === 'ESGU2' ? (
                            <OwnComment comment={comment} />
                          ) : (
                            <Comment comment={comment} />
                          )}
                        </CommentPadder>
                      );
                    })}
                  </>
                )}
              </Flex>
            </Scrollbars>
          </CommentsWrapper>
        </Container>
      </Flex>
      <NewComment basis={'5%'}>
        <Container>
          <PostComment
            handlePostComment={commentText => postNewComment(commentText)}
          />
        </Container>
      </NewComment>
    </>
  );
}
