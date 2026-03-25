import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  getFeedOrders,
  getFeedLoading
} from '../../services/slices/feedSlice';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Feed = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeedOrders);
  const loading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
