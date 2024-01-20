import { useNavigate } from 'react-router-dom';
import { User } from '../../models/user';

export const useNavigationPath = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/users/home');
  };

  const goToUserEdit = (user: User) => {
    navigate(`/users/edit/${user?.id}`, { state: { user } });
  }

  const goToUserCreate = () => {
    navigate('/users/create');
  }

  return {
    goToHome,
    goToUserEdit,
    goToUserCreate
  };
};

