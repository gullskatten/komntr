import React from 'react';
import sample_posts from '../data/sample_posts';
import Post from './Post';

export default function Posts(props) {
  const {
    match: {
      params: { channelId }
    }
  } = props;

  const currentPosts = sample_posts.filter(f => f.channelId === channelId);
  return (
    <div>
      {currentPosts.map(item => (
        <Post post={item} key={item.id}></Post>
      ))}
    </div>
  );
}
