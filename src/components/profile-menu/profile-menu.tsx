import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logout } from '../../services/slices/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout()).then(() => navigate('/login'));
  };
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
