import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserState } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const { user } = useSelector(getUserState);
  return <AppHeaderUI userName={user?.name || ''} />;
};
