import React, { useContext } from 'react';
import Channel from './Channel';
import { TitleContext } from '../context/AppTitleContext';
import determineColorForString from '../utils/determineColorForString';
import Container from '../styleguides/Container';
import useApi from '../hooks/useApi';
import Busy from './Busy';
import CreateChannelItem from './CreateChannelItem';

export default function Channels(props) {
  
  const { dispatch } = useContext(TitleContext);
  const {
    match: {
      params: { categoryId }
    }
  } = props;

  const [fetchingCategory, category] = useApi({
    endpoint: `categories/${categoryId}`,
    fetchOnMount: true,
    initialData: null,
    onSuccess: currentCategory => {
      dispatch({
        type: 'set-title',
        data: {
          title: currentCategory.name,
          titleColor: determineColorForString(currentCategory.name)
        }
      });
    }
  });

  const [fetchingChannels, channels] = useApi({
    endpoint: `categories/${categoryId}/channels`,
    fetchOnMount: true,
    initialData: []
  });

  if (!category) return null;

  return (
    <Busy busy={fetchingCategory || fetchingChannels}>
      <Container>
        <CreateChannelItem categoryId={category._id} />
        {channels.map(item => (
          <Channel channel={item} key={item._id} />
        ))}
      </Container>
    </Busy>
  );
}
