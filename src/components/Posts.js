import React, { useEffect, useContext } from 'react';
import sample_posts from '../data/sample_posts';
import Post from './Post';
import { TitleContext } from '../context/AppTitleContext';
import sample_channels from '../data/sample_channels';
import determineColorForString from '../utils/determineColorForString';
import Container from '../styleguides/Container';

export default function Posts(props) {
  let { dispatch } = useContext(TitleContext);

  const {
    match: {
      params: { channelId }
    }
  } = props;

  useEffect(() => {
    const currentChannel = sample_channels.find(channel => channel.id === channelId);
    
    dispatch({
      type: "set-title",
      data: {
        title: currentChannel.name,
        titleColor: determineColorForString(currentChannel.name) 
      }
    });
  }, []);


  const currentPosts = sample_posts.filter(f => f.channelId === channelId);

  return (
    <Container>
      {currentPosts.map(item => (
        <Post post={item} key={item.id}></Post>
      ))}
    </Container>
  );
}
