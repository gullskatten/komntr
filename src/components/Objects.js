import React from 'react';
import { Link } from 'react-router-dom';
import sample_posts from '../data/sample_posts';

export default function Objects(props) {
  const {
    match: {
      params: { systemId }
    }
  } = props;

  const currentPosts = sample_posts.filter(f => f.channelId === systemId);

  return (
    <div>
      {currentPosts.map(item => (
        <li style={{ color: 'white' }} key={item.id}>
          <Link to={`/${systemId}/${item.id}`}>
            {item.name} - {item.channelId}
          </Link>
        </li>
      ))}
    </div>
  );
}
