import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds, getFeedState } from '../../services/slices/feed';
import { AppDispatch } from 'src/services';

export const Feed: FC = () => {
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (loading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
