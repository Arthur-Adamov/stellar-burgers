import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { dataSelector } from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(dataSelector);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
