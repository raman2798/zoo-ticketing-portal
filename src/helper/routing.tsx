import { FC, ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isEqual } from 'lodash';
import { MainLayout } from '@/layouts';

export const PublicRoute: FC = (): ReactElement => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (isEqual(currentPath, '/')) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isEqual(currentPath, '/tickets')) {
    return <Navigate to="/tickets/counters" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
