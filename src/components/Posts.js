import React, { useContext } from 'react';
import Post from './Post';
import { TitleContext } from '../context/AppTitleContext';
import determineColorForString from '../utils/determineColorForString';
import Container from '../styleguides/Container';
import useApi from '../hooks/useApi';
import Busy from './Busy';

export default function Posts(props) {
  const { dispatch } = useContext(TitleContext);
  const {
    match: {
      params: { channelId }
    }
  } = props;

  const [fetchingChannel, channel] = useApi({
    endpoint: `categories/${channelId}`,
    fetchOnMount: true,
    initialData: null,
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

  const [fetchingPosts, posts] = useApi({
    endpoint: `categories/${channelId}/posts`,
    fetchOnMount: true,
    initialData: []
  });

  if (!channel) return null;

  return (
    <Busy busy={fetchingChannel || fetchingPosts}>
      <Container>
        {posts.map(item => (
          <Post post={item} key={item._id} />
        ))}
      </Container>
    </Busy>
  );
}
