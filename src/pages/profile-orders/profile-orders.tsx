import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getUserState } from '../../services/slices/user';
import { Preloader } from '../../components/ui';
import { AppDispatch } from 'src/services';

export const ProfileOrders: FC = () => {
  const { userOrders, loading } = useSelector(getUserState);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
