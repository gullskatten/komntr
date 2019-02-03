import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import NoResults from './NoResults';
import CreateMessage from './CreateMessage';
import Message from './Message';
import Container from '../styleguides/Container';
import Flex from '../styleguides/Flex';
import { TitleContext } from '../context/AppTitleContext';
import determineColorForString from '../utils/determineColorForString';
import useApi from '../hooks/useApi';
import Busy from './Busy';

const MessagesContainer = styled.div``;

const MessagesWrapper = styled.div`
  width: 100%;
  height: 73vh;
`;

const MessagePadder = styled.div`
  margin: 15px 0;
`;

const NewMessage = styled(Flex)`
  position: fixed;
  bottom: 0;
  width: 100%;

  @media all and (max-width: 650px) {
    flex-basis: 10%;
  }
`;

export default function Messages(props) {
  const {
    match: {
      params: { categoryId, channelId }
    }
  } = props;
  const scrollRef = useRef(null);
  const { dispatch } = useContext(TitleContext);

  const [fetchingChannel, channel] = useApi({
    endpoint: `categories/${categoryId}/channels/${channelId}`,
    initialData: null,
    fetchOnMount: true,
    onSuccess: currentChannel => {
      dispatch({
        type: 'set-title',
        data: {
          title: currentChannel.name,
          titleColor: determineColorForString(currentChannel.name)
        }
      });
    }
  });

  // eslint-disable-next-line
  const [fetchingMessages, messages, _, refetchMessages] = useApi({
    endpoint: `categories/${categoryId}/channels/${channelId}/messages`,
    initialData: [],
    fetchOnMount: true
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToBottom(60);
    }
  }, [scrollRef.current, messages.length]);

  if (!channel) return null;

  return (
    <Busy busy={fetchingChannel || fetchingMessages}>
      <MessagesContainer>
        <Flex
          justify="center"
          alignItems="center"
          direction="column"
          basis="auto"
        >
          <Container>
            <MessagesWrapper>
              {!messages || messages.length === 0 ? (
                <NoResults label={'Bli den første til å skrive noe her?'} />
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
                    {messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(comment => {
                      return (
                        <MessagePadder key={comment._id}>
                          <Message comment={comment} />
                        </MessagePadder>
                      );
                    })}
                  </Flex>
                </Scrollbars>
              )}
            </MessagesWrapper>
          </Container>
        </Flex>
        <NewMessage basis={'5%'}>
          <Container>
            <CreateMessage
              onCreateMessageSuccess={refetchMessages}
              categoryId={categoryId}
              channelId={channelId}
            />
          </Container>
        </NewMessage>
      </MessagesContainer>
    </Busy>
  );
}
