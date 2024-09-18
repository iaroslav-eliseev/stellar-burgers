import { useSelector } from 'react-redux';
import { getUserState } from '../../services/slices/user';
import { Outlet } from 'react-router-dom';
import { Preloader } from '@ui';

export default function ProtectedRoute({
  children
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useSelector(getUserState);

  if (user) {
    return children;
  }

  if (loading) {
    return <Preloader />;
  }

  return <Outlet />;
}
