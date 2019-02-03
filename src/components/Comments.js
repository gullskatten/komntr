import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import NoResults from './NoResults';
import CreateComment from './CreateComment';
import Comment from './Comment';
import Container from '../styleguides/Container';
import Flex from '../styleguides/Flex';
import { TitleContext } from '../context/AppTitleContext';
import determineColorForString from '../utils/determineColorForString';
import useApi from '../hooks/useApi';
import Busy from './Busy';

const CommentsContainer = styled.div``;

const CommentsWrapper = styled.div`
  width: 100%;
  height: 73vh;
`;

const CommentPadder = styled.div`
  margin: 15px 0;
`;

const NewComment = styled(Flex)`
  position: fixed;
  bottom: 0;
  width: 100%;

  @media all and (max-width: 650px) {
    flex-basis: 10%;
  }
`;

export default function Comments(props) {
  const {
    match: {
      params: { channelId, postId }
    }
  } = props;
  const scrollRef = useRef(null);
  const { dispatch } = useContext(TitleContext);

  const [fetchingPost, post] = useApi({
    endpoint: `categories/${channelId}/posts/${postId}`,
    initialData: null,
    fetchOnMount: true,
    onSuccess: currentPost => {
      dispatch({
        type: 'set-title',
        data: {
          title: currentPost.name,
          titleColor: determineColorForString(currentPost.name)
        }
      });
    }
  });

  // eslint-disable-next-line
  const [fetchingComments, comments, _, refetchComments] = useApi({
    endpoint: `categories/${channelId}/posts/${postId}/comments`,
    initialData: [],
    fetchOnMount: true
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToBottom(60);
    }
  }, [scrollRef.current, comments.length]);

  if (!post) return null;

  return (
    <Busy busy={fetchingPost || fetchingComments}>
      <CommentsContainer>
        <Flex
          justify="center"
          alignItems="center"
          direction="column"
          basis="auto"
        >
          <Container>
            <CommentsWrapper>
              {!comments || comments.length === 0 ? (
                <NoResults label={'Be the first to write something here?'} />
              ) : (
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
                    {comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(comment => {
                      return (
                        <CommentPadder key={comment._id}>
                          <Comment comment={comment} />
                        </CommentPadder>
                      );
                    })}
                  </Flex>
                </Scrollbars>
              )}
            </CommentsWrapper>
          </Container>
        </Flex>
        <NewComment basis={'5%'}>
          <Container>
            <CreateComment
              onCreateCommentSuccess={refetchComments}
              channelId={channelId}
              postId={postId}
            />
          </Container>
        </NewComment>
      </CommentsContainer>
    </Busy>
  );
}
